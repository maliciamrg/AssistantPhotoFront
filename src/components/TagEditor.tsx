import React, {useEffect, useState} from 'react';
import {Tag, TagEditorProps, TagTreeNode} from '../types';


function buildTagTree(tags: Tag[]): TagTreeNode[] {
    const tagMap: Record<string, TagTreeNode> = {};

    tags.forEach(tag => {
        tagMap[tag.id] = {...tag, children: []};
    });

    const root: TagTreeNode[] = [];

    tags.forEach(tag => {
        if (tag.parentId === null) {
            root.push(tagMap[tag.id]);
        } else {
            const parent = tagMap[tag.parentId];
            if (parent) {
                parent.children.push(tagMap[tag.id]);
            }
        }
    });

    const sortTree = (nodes: TagTreeNode[]) => {
        nodes.sort((a, b) => a.name.localeCompare(b.name));
        nodes.forEach(n => sortTree(n.children));
    };

    sortTree(root);

    return root;
}

const TagEditor: React.FC<TagEditorProps> = ({ tags, onClose, onUpdate }) => {
    const [tagTree, setTagTree] = useState<TagTreeNode[]>(buildTagTree(tags));
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        setTagTree(buildTagTree(tags));
    }, [tags]);

    const toggleNode = (id: string) => {
        setExpandedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleAdd = (parentId: string | null) => {
        const name = prompt("Enter new tag name:");
        if (name?.trim()) {
            const newTag: Omit<Tag, 'id'> = {
                name: name.trim(),
                parentId,
            };
            onUpdate('create', newTag);
        }
    };

    const handleEdit = (tag: Tag) => {
        const name = prompt("Edit tag name:", tag.name);
        if (name?.trim() && name !== tag.name) {
            onUpdate('update', { ...tag, name: name.trim() });
        }
    };

    const handleDelete = (tagId: string) => {
        if (confirm("Delete this tag and all its sub-tags?")) {
            const tag = tags.find(t => t.id === tagId);
            if (tag) onUpdate('delete', tag);
        }
    };

    const getAllExpandableIds = (nodes: TagTreeNode[]): string[] => {
        const result: string[] = [];
        const traverse = (nodeList: TagTreeNode[]) => {
            nodeList.forEach(node => {
                if (node.children.length > 0) {
                    result.push(node.id);
                    traverse(node.children);
                }
            });
        };
        traverse(nodes);
        return result;
    };

    const expandAll = () => {
        const allIds = getAllExpandableIds(tagTree);
        setExpandedIds(new Set(allIds));
    };

    const collapseAll = () => {
        setExpandedIds(new Set()); // clear all
    };
    
    return (
        <div>
            <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={expandAll}
            >
                Expand All
            </button>
            <button
                className="bg-yellow-600 text-white px-3 py-1 rounded"
                onClick={collapseAll}
            >
                Collapse All
            </button>
            <button
                className="ml-auto bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => handleAdd(null)}
            >
                + Add Root Tag
            </button>

            <ul>
                {renderTree(tagTree, handleAdd, handleEdit, handleDelete, expandedIds, toggleNode)}
            </ul>

            <div className="mt-6 flex justify-end">
                <button
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};


function renderTree(
    tree: TagTreeNode[],
    onAdd: (parentId: string) => void,
    onEdit: (tag: Tag) => void,
    onDelete: (tagId: string) => void,
    expandedIds: Set<string>,
    toggleNode: (id: string) => void,
    depth: number = 0
): React.ReactNode {
    return tree.map(tag => {
        const isExpanded = expandedIds.has(tag.id);
        const hasChildren = tag.children.length > 0;

        return (
            <li key={tag.id} style={{ marginLeft: depth * 16 }} className="my-1">
                <div className="flex items-center gap-2">
                    {hasChildren ? (
                        <button
                            onClick={() => toggleNode(tag.id)}
                            className="text-xs w-4"
                            title={isExpanded ? "Collapse" : "Expand"}
                        >
                            {isExpanded ? "▼" : "▶"}
                        </button>
                    ) : (
                        <span className="inline-block w-4" /> // Empty space for alignment
                    )}

                    <span>{tag.name}</span>

                    <button onClick={() => onAdd(tag.id)} className="text-green-600 text-xs">+Add</button>
                    <button onClick={() => onEdit(tag)} className="text-blue-600 text-xs">Edit</button>
                    <button onClick={() => onDelete(tag.id)} className="text-red-600 text-xs">Delete</button>
                </div>

                {hasChildren && isExpanded && (
                    <ul>
                        {renderTree(tag.children, onAdd, onEdit, onDelete, expandedIds, toggleNode, depth + 1)}
                    </ul>
                )}
            </li>
        );
    });
}


export default TagEditor;
