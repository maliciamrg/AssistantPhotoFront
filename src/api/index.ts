import {Photo, PhotoShoot, PhotoshootNameNewDTO, PhotoshootType} from "../types";

export const API_BASE_URL = 'http://localhost:8099/api';

// Mock data for development
const MOCK_SEANCE_TYPES: PhotoshootType[] = [
    {
        "photoshootTypeEnum": "ALL_IN",
        "uniteDeJour": 0,
        "nbMaxParUniteDeJour": 0,
        "ratioStarMin": null,
        "ratioStarMax": null,
        "zoneValeurAdmise": null,
        "rapprochementNewOk": false,
        "photoshootRoot": [
            {
                "name": null,
                "path": "00-CheckIn",
                "description": "Main check-in folder"
            }
        ]
    },
    {
        "photoshootTypeEnum": "ASSISTANT_WORK",
        "uniteDeJour": 0,
        "nbMaxParUniteDeJour": 0,
        "ratioStarMin": null,
        "ratioStarMax": null,
        "zoneValeurAdmise": null,
        "rapprochementNewOk": false,
        "photoshootRoot": [
            {
                "name": null,
                "path": "10-Assistant_work",
                "description": "Work folder for the Assistant"
            }
        ]
    },
    {
        "photoshootTypeEnum": "REJET",
        "uniteDeJour": 0,
        "nbMaxParUniteDeJour": 0,
        "ratioStarMin": null,
        "ratioStarMax": null,
        "zoneValeurAdmise": null,
        "rapprochementNewOk": false,
        "photoshootRoot": [
            {
                "name": null,
                "path": "99-Rejet",
                "description": "Rejected items"
            }
        ]
    },
    {
        "photoshootTypeEnum": "SAUVEGARDE",
        "uniteDeJour": 0,
        "nbMaxParUniteDeJour": 0,
        "ratioStarMin": null,
        "ratioStarMax": null,
        "zoneValeurAdmise": null,
        "rapprochementNewOk": false,
        "photoshootRoot": [
            {
                "name": null,
                "path": "50-Phototheque\\#Sauvegarde 999 j",
                "description": "Backup photographs"
            }
        ]
    },
    {
        "photoshootTypeEnum": "EVENTS",
        "uniteDeJour": 1,
        "nbMaxParUniteDeJour": 15,
        "ratioStarMin": [
            1,
            1,
            0,
            0,
            0
        ],
        "ratioStarMax": [
            25,
            12,
            5,
            2,
            1
        ],
        "zoneValeurAdmise": [
            "£DATE£",
            "@00_EVENT@",
            "@00_WHERE@",
            "@00_WHAT@|@00_WHO@"
        ],
        "rapprochementNewOk": true,
        "photoshootRoot": [
            {
                "name": null,
                "path": "50-Phototheque\\##Events 10-15 j",
                "description": "Events photographs"
            }
        ]
    },
    {
        "photoshootTypeEnum": "HOLIDAYS",
        "uniteDeJour": 7,
        "nbMaxParUniteDeJour": 30,
        "ratioStarMin": [
            1,
            1,
            0,
            0,
            0
        ],
        "ratioStarMax": [
            25,
            12,
            5,
            2,
            1
        ],
        "zoneValeurAdmise": [
            "£DATE£",
            "@00_EVENT@",
            "@00_WHERE@",
            "@00_WHAT@|@00_WHO@"
        ],
        "rapprochementNewOk": true,
        "photoshootRoot": [
            {
                "name": null,
                "path": "50-Phototheque\\##Holidays 20-30 sem",
                "description": "Holiday photographs"
            }
        ]
    },
    {
        "photoshootTypeEnum": "SHOOTING",
        "uniteDeJour": 1,
        "nbMaxParUniteDeJour": 5,
        "ratioStarMin": [
            1,
            1,
            0,
            0,
            0
        ],
        "ratioStarMax": [
            25,
            12,
            5,
            2,
            1
        ],
        "zoneValeurAdmise": [
            "£DATE£",
            "@00_PHOTOGRAPHY@",
            "@00_WHERE@",
            "@00_WHAT@|@00_WHO@"
        ],
        "rapprochementNewOk": true,
        "photoshootRoot": [
            {
                "name": null,
                "path": "50-Phototheque\\##Shooting 03-05 j",
                "description": "Shooting session photographs"
            }
        ]
    }
];

const MOCK_SEANCE_photoShoot: PhotoShoot[] = [
    {
        "name": "2021-04-17_anniversaire_antony_colette",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-04-17_anniversaire_antony_colette",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-07-16_spectacle_rockenseine_concert",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-07-16_spectacle_rockenseine_concert",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-11_anniversaire_antony_miya",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-11_anniversaire_antony_miya",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-04-04_paques_antony_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-04-04_paques_antony_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "parc anonty",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/parc anonty",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-12-15_sapin_antony",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-12-15_sapin_antony",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2024-07-24_passege_flamme",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2024-07-24_passege_flamme",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "bateau meaux",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/bateau meaux",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-10-14_sortie_provins_rapace",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-10-14_sortie_provins_rapace",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-01-13_anniversaire_paris_virginie",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-01-13_anniversaire_paris_virginie",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-03-26_week-end_brussel_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-03-26_week-end_brussel_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-04-01_paques_chatillion_kevorian",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-04-01_paques_chatillion_kevorian",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-31_nouvel an_clamart_laure",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-31_nouvel an_clamart_laure",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "1995-08-24_competition_spa-francorchamps_voiture",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/1995-08-24_competition_spa-francorchamps_voiture",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-11-06_accident_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-11-06_accident_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-04-21_parc_chatillion_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-04-21_parc_chatillion_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-06-30_randonnee_lemans_roller",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-06-30_randonnee_lemans_roller",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-03-11_competition_dourdan_roller",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-03-11_competition_dourdan_roller",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-10-28_sport_verriere_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-10-28_sport_verriere_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "ferme de gally",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/ferme de gally",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-01-17_nouvel an_antony_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-01-17_nouvel an_antony_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "quai branly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/quai branly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2010-11-07_exposition_paris_photo",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2010-11-07_exposition_paris_photo",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-08-20_excursion_fontainbleau_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-08-20_excursion_fontainbleau_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-29_sortie_antony_patinoire",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-29_sortie_antony_patinoire",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-01-16_anniversaire_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-01-16_anniversaire_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-05-06_sortie_louvre_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-05-06_sortie_louvre_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-05-08_anniversaire_thiais_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-05-08_anniversaire_thiais_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-07-18_mariage_montbazon_melanie",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-07-18_mariage_montbazon_melanie",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-07-21_sport_perrone_parachute",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-07-21_sport_perrone_parachute",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-01-11_soiree_paris_hockey",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-01-11_soiree_paris_hockey",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-05-11_sport_dijon_roller",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-05-11_sport_dijon_roller",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-02-25_nouvel an lunaire_paris_defilé",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-02-25_nouvel an lunaire_paris_defilé",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "Guédelon",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/Guédelon",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-01-15_anniversaire_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-01-15_anniversaire_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-10-09_accident_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-10-09_accident_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-07-10_sortie_paris_virginie",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-07-10_sortie_paris_virginie",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-06-29_ecole_fontainbleau_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-06-29_ecole_fontainbleau_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-04-08_randonnee_massy_roller",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-04-08_randonnee_massy_roller",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-01-30_week-end_antony_neige",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-01-30_week-end_antony_neige",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-12-29_sortie_antony_patinoire",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-12-29_sortie_antony_patinoire",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-12-11_anniversaire_antony_miya",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-12-11_anniversaire_antony_miya",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-06-10_dinner_antony_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-06-10_dinner_antony_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-05-23_spectacle_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-05-23_spectacle_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-04-02_anniversaire_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-04-02_anniversaire_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-07-03_fete_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-07-03_fete_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "halloween",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/halloween",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-08-19_sortie_elancourt_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-08-19_sortie_elancourt_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-06-16_barbecue_antony_roller",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-06-16_barbecue_antony_roller",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-06-30_spectacle_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-06-30_spectacle_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "anniversaire melina",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/anniversaire melina",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-08-22_visite_dourdan_chateau",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-08-22_visite_dourdan_chateau",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-12-09_anniversaire_antony_miya",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-12-09_anniversaire_antony_miya",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-04-08_anniversaire_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-04-08_anniversaire_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-12-13_anniversaire_antony_miya",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-12-13_anniversaire_antony_miya",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-04-22_paques_antony_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-04-22_paques_antony_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-05-08_fete_antony_copain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-05-08_fete_antony_copain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-09-11_sport_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-09-11_sport_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-01-14_sport_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-01-14_sport_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-06-29_spectacle_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-06-29_spectacle_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-04-10_anniversaire_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-04-10_anniversaire_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "fermeture fringante",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/fermeture fringante",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-07-03_sortie_antony_miya",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-07-03_sortie_antony_miya",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-10-31_halloween_antony_none",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-10-31_halloween_antony_none",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-06-15_sortie_clichy_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-06-15_sortie_clichy_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-04-02_paques_antony_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-04-02_paques_antony_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-10-31_halloween_antony_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-10-31_halloween_antony_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-02-11_sport_paris_roller",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-02-11_sport_paris_roller",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-04-04_paques_antony_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-04-04_paques_antony_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-03-08_sport_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-03-08_sport_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-05-30_week-end_sarges-le-mans_alexandre",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-05-30_week-end_sarges-le-mans_alexandre",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-01_sortie_sarges-le-mans_bowling",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-01_sortie_sarges-le-mans_bowling",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-26_noël_clichy_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-26_noël_clichy_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "1993-01-15_anniversaire_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/1993-01-15_anniversaire_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-07-12_sortie_elancourt_franceminiature",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-07-12_sortie_elancourt_franceminiature",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "1992-12-01_salon_paris_bateau à voile",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/1992-12-01_salon_paris_bateau à voile",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-01-11_soiree_paris_sodifrance",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-01-11_soiree_paris_sodifrance",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-06-19_anniversaire_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-06-19_anniversaire_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "1996-01-21_fete_noisy-le-sec_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/1996-01-21_fete_noisy-le-sec_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-04-16_week-end_dieppe_cerf-volant",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-04-16_week-end_dieppe_cerf-volant",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-07-02_sortie_ermenonville_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-07-02_sortie_ermenonville_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-04-08_anniversaire_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-04-08_anniversaire_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019 poney",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019 poney",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-12-31_noël_antony_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-12-31_noël_antony_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-09-01_barbecue_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-09-01_barbecue_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-05-19_visite_vaux-le-vicomte_colette",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-05-19_visite_vaux-le-vicomte_colette",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-12-11_anniversaire_antony_miya",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-12-11_anniversaire_antony_miya",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2022-10-27_halloween_ferme de gally_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2022-10-27_halloween_ferme de gally_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-08-19_barbecue_neuilly_benoit",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-08-19_barbecue_neuilly_benoit",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-18_sortie_antony_patinoire",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-18_sortie_antony_patinoire",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-07-03_anniversaire_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-07-03_anniversaire_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "anniversaire benoit",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/anniversaire benoit",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2010-10-02_soiree_paris_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2010-10-02_soiree_paris_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-06-03_competition_collegien_hockey",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-06-03_competition_collegien_hockey",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-01-25_competition_chatillion_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-01-25_competition_chatillion_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-07-13_excursion_saint-quentin-yvelines_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-07-13_excursion_saint-quentin-yvelines_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-08-01_anniversaire_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-08-01_anniversaire_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2009-12-31_nouvel an_rosny_david",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2009-12-31_nouvel an_rosny_david",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "ferm de gally",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/ferm de gally",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-12-31_nouvel an_collegien_hl&jc",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-12-31_nouvel an_collegien_hl&jc",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "1996-01-15_anniversaire_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/1996-01-15_anniversaire_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2022-12-26_exposition_saint cloud_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2022-12-26_exposition_saint cloud_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2003-10-01_mariage_royan_grand parent",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2003-10-01_mariage_royan_grand parent",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-12-17_sortie_lyon_team building",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-12-17_sortie_lyon_team building",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-06-16_sortie_paris_fifa wwc",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-06-16_sortie_paris_fifa wwc",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-10-24_sortie_paris_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-10-24_sortie_paris_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-10-31_halloween_antony_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-10-31_halloween_antony_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-04-28_week-end_ la fleche_zoo",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-04-28_week-end_ la fleche_zoo",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-12-24_noël_vitry_seb&ahlem",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-12-24_noël_vitry_seb&ahlem",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2022-04-16_competition_chatenay_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2022-04-16_competition_chatenay_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-28_sortie_antony_patinoire",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-28_sortie_antony_patinoire",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-06-25_spectacle_fresnes_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-06-25_spectacle_fresnes_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2022-12-24_noël_antony_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2022-12-24_noël_antony_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-03-17_anniversaire_antony_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-03-17_anniversaire_antony_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-07-21_sortie_noisy-le-sec_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-07-21_sortie_noisy-le-sec_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-10-19_musee_paris_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-10-19_musee_paris_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-01-20_anniversaire_antony_romain",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-01-20_anniversaire_antony_romain",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-08-27_parc_plailly_chloe",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-08-27_parc_plailly_chloe",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-12-24_noël_antony_famille",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-12-24_noël_antony_famille",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-05-19_week-end_la bohalle_cousin",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-05-19_week-end_la bohalle_cousin",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2020-10-22_musee_paris_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2020-10-22_musee_paris_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-06-09_sortie_perrone_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-06-09_sortie_perrone_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2021-05-08_sortie_parc de sceaux_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2021-05-08_sortie_parc de sceaux_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-04-15_week-end_dieppe_cerf-volant",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-04-15_week-end_dieppe_cerf-volant",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "anniversaire 3 ans melina",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/anniversaire 3 ans melina",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-03-30_sport_paris_hockey",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-03-30_sport_paris_hockey",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-04-06_soiree_velizy_team building",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-04-06_soiree_velizy_team building",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-03-17_anniversaire_antony_sandrine",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-03-17_anniversaire_antony_sandrine",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2018-01-14_sortie_longjumeau_ferme",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2018-01-14_sortie_longjumeau_ferme",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-30_sortie_paris_disneyland",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-30_sortie_paris_disneyland",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2023-04-08_anniversaire_antony_nelly",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2023-04-08_anniversaire_antony_nelly",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-10-29_musee_paris_enfants",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-10-29_musee_paris_enfants",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2017-12-31_nouvel an_chatillion_jean charles",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2017-12-31_nouvel an_chatillion_jean charles",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    },
    {
        "name": "2019-12-15_sport_antony_laureline",
        "path": "/Photo/50-Phototheque/##Events 10-15 j/2019-12-15_sport_antony_laureline",
        "description": null,
        "metaDataFromPhotoshoot": null,
        "groupOfPhoto": null
    }
];

const MOCK_PHOTOS: Photo[] = [
    {
        "id": "27fa51e0-ff1b-41b4-9ba1-0d5227b56f72",
        "hash": "c4e4672f17b14ec097dc748c5ab31f4016a5a3f92a7fd99f05f371432eb324b0",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\44.022.078.012.076.044.096.093.038.02021-08-31_151747_htc htc desire 626_2021_08_31_100media_imag5930.jpg",
        "relativeToPath": "\\44.022.078.012.076.044.096.093.038.02021-08-31_151747_htc htc desire 626_2021_08_31_100media_imag5930.jpg",
        "filename": "44.022.078.012.076.044.096.093.038.02021-08-31_151747_htc htc desire 626_2021_08_31_100media_imag5930.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:48",
        "exifDate": "2021-08-31 15:17:47",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "e567cad4-d38b-42b4-bcdf-20b1e2ffc828",
        "hash": "461885b71c330c8338552e32dd3abd3a3fe2abce1ac1234001c98fc7406fe376",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\27.058.099.044.089.020.00.0100.016.02021-08-31_145420_htc htc desire 626_2021_08_31_100media_imag5915.jpg",
        "relativeToPath": "\\27.058.099.044.089.020.00.0100.016.02021-08-31_145420_htc htc desire 626_2021_08_31_100media_imag5915.jpg",
        "filename": "27.058.099.044.089.020.00.0100.016.02021-08-31_145420_htc htc desire 626_2021_08_31_100media_imag5915.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:27",
        "exifDate": "2021-08-31 14:54:20",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "1341039b-a948-4e0a-b2b4-18fafcd9714f",
        "hash": "f6c886ffa3e5bffcf6d5a20a75e1b3d52fe29295539528167f78f736a359cfae",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\52.043.048.025.051.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5918.jpg",
        "relativeToPath": "\\52.043.048.025.051.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5918.jpg",
        "filename": "52.043.048.025.051.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5918.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:52",
        "exifDate": "2021-08-31 14:54:29",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "c766a7bd-2405-4b6a-9d74-99d385b6226e",
        "hash": "80344950174e829cd99acb8f2164286f469cbce0f03d06be7d76cba4e32fb7f0",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\16.042.060.048.031.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5921.jpg",
        "relativeToPath": "\\16.042.060.048.031.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5921.jpg",
        "filename": "16.042.060.048.031.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5921.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:43",
        "exifDate": "2021-08-31 15:02:46",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "8003a70d-926f-46d3-a0df-b72194f225e9",
        "hash": "faac7a7d5575e849c75754e6fbe74723ba09cb849976103f51716b3fe7ef23c8",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\1.099.06.063.076.089.062.088.045.02021-08-31_150501_htc htc desire 626_2021_08_31_100media_imag5926.jpg",
        "relativeToPath": "\\1.099.06.063.076.089.062.088.045.02021-08-31_150501_htc htc desire 626_2021_08_31_100media_imag5926.jpg",
        "filename": "1.099.06.063.076.089.062.088.045.02021-08-31_150501_htc htc desire 626_2021_08_31_100media_imag5926.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:47",
        "exifDate": "2021-08-31 15:05:01",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "9ddb2d28-7158-41a7-9160-8267987470d7",
        "hash": "4b00ed6af0c0e4f5514e6168462371fa1ec6c72766308490ed43aecd4a9f0f2d",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\25.095.054.081.092.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5926.jpg",
        "relativeToPath": "\\25.095.054.081.092.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5926.jpg",
        "filename": "25.095.054.081.092.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5926.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:53",
        "exifDate": "2021-08-31 15:05:01",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "7df28cdb-14f9-4f0f-8796-0335ab2499c7",
        "hash": "5857d0e3b427ad80e2d6194e66c11d2dd17d2fd686f685dfafa0ff86527016d8",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\49.018.07.079.012.084.057.069.085.02021-08-31_145423_htc htc desire 626_2021_08_31_100media_imag5916.jpg",
        "relativeToPath": "\\49.018.07.079.012.084.057.069.085.02021-08-31_145423_htc htc desire 626_2021_08_31_100media_imag5916.jpg",
        "filename": "49.018.07.079.012.084.057.069.085.02021-08-31_145423_htc htc desire 626_2021_08_31_100media_imag5916.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:27",
        "exifDate": "2021-08-31 14:54:23",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "e3f5da4b-a6a9-46c9-aef7-ede3089251d5",
        "hash": "ab529f99fd957b9fb94b7e1cc2c258965cc5b60f43a83173250b5665cd2eb47b",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\14.037.056.048.092.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5930.jpg",
        "relativeToPath": "\\14.037.056.048.092.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5930.jpg",
        "filename": "14.037.056.048.092.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5930.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:54",
        "exifDate": "2021-08-31 15:17:47",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "e9cbe21d-3c82-4d07-9efb-375fcb3d233e",
        "hash": "15464ae78922cc41118db4299ad8814609beb1ed17c23cf652b969531eec68ec",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\19.011.076.041.012.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5924.jpg",
        "relativeToPath": "\\19.011.076.041.012.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5924.jpg",
        "filename": "19.011.076.041.012.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5924.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:57",
        "exifDate": "2021-08-31 15:04:09",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "ea8cd1f6-e18e-49a0-842b-c4251ab63fb6",
        "hash": "adc17f944635ff8bfc4c92608bcbfb47a8fbdd79e0143a7de774c640104d1d2b",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\73.0100.061.094.020.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5922.jpg",
        "relativeToPath": "\\73.0100.061.094.020.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5922.jpg",
        "filename": "73.0100.061.094.020.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5922.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:58",
        "exifDate": "2021-08-31 15:03:29",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "8725e743-de05-4ebf-8045-8d65fdd61e1f",
        "hash": "2a6429a4fcede62022439e407182826f90e0b08442c839c3881f83b4dda2dfa8",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\93.022.046.00.09.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5916.jpg",
        "relativeToPath": "\\93.022.046.00.09.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5916.jpg",
        "filename": "93.022.046.00.09.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5916.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:49",
        "exifDate": "2021-08-31 14:54:23",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "54e6a572-fe67-45d2-812e-f45724139694",
        "hash": "ef61ecb652307ada52dc634230d17625a2632fb9e6032fc3a15c29af654b3f23",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\8.024.067.016.019.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5919.jpg",
        "relativeToPath": "\\8.024.067.016.019.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5919.jpg",
        "filename": "8.024.067.016.019.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5919.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:41",
        "exifDate": "2021-08-31 15:01:38",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "07e850e2-c728-4a19-a652-ca3a3e5090ff",
        "hash": "c1880ec3616098fe421b9a3c7af580923f7aa151b8ad9ebac4bd2bc64917aaaa",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\81.047.08.044.044.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5917.jpg",
        "relativeToPath": "\\81.047.08.044.044.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5917.jpg",
        "filename": "81.047.08.044.044.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5917.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:47",
        "exifDate": "2021-08-31 14:54:25",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "bf5c8934-a24f-4131-9451-4039a18fbd41",
        "hash": "57b144a862c485523042843cc7003d5c0cf157dd75a1e883e66d453c0474ef1d",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\22.099.036.065.014.033.054.022.015.02021-08-31_145425_htc htc desire 626_2021_08_31_100media_imag5917.jpg",
        "relativeToPath": "\\22.099.036.065.014.033.054.022.015.02021-08-31_145425_htc htc desire 626_2021_08_31_100media_imag5917.jpg",
        "filename": "22.099.036.065.014.033.054.022.015.02021-08-31_145425_htc htc desire 626_2021_08_31_100media_imag5917.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:29",
        "exifDate": "2021-08-31 14:54:25",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "c13add31-c4f5-4190-b66d-b6a9c53d656c",
        "hash": "910a9f40113eee05c26ec8a20882244bb0f542fa43b817db0f361c1cddbce6ff",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\47.095.034.011.07.032.012.015.02.02021-08-31_150329_htc htc desire 626_2021_08_31_100media_imag5922.jpg",
        "relativeToPath": "\\47.095.034.011.07.032.012.015.02.02021-08-31_150329_htc htc desire 626_2021_08_31_100media_imag5922.jpg",
        "filename": "47.095.034.011.07.032.012.015.02.02021-08-31_150329_htc htc desire 626_2021_08_31_100media_imag5922.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:40",
        "exifDate": "2021-08-31 15:03:29",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "5228ea8f-4e8f-4a9c-bf1d-88b878da463b",
        "hash": "84584ca9c60db4cf4d51e0c396441f1792bed69dea7cb7d657229c34feaf8095",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\62.051.074.036.072.061.096.087.042.02021-08-31_150138_htc htc desire 626_2021_08_31_100media_imag5919.jpg",
        "relativeToPath": "\\62.051.074.036.072.061.096.087.042.02021-08-31_150138_htc htc desire 626_2021_08_31_100media_imag5919.jpg",
        "filename": "62.051.074.036.072.061.096.087.042.02021-08-31_150138_htc htc desire 626_2021_08_31_100media_imag5919.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:34",
        "exifDate": "2021-08-31 15:01:38",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "2d9b8b29-ccd1-43ca-af24-91ee4d10b13e",
        "hash": "cb95280979b6f0b971a6383c1d03bb12a068d658ec178a13ab2c364caee8cb6a",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\17.03.085.093.021.083.063.013.070.02021-08-31_150409_htc htc desire 626_2021_08_31_100media_imag5924.jpg",
        "relativeToPath": "\\17.03.085.093.021.083.063.013.070.02021-08-31_150409_htc htc desire 626_2021_08_31_100media_imag5924.jpg",
        "filename": "17.03.085.093.021.083.063.013.070.02021-08-31_150409_htc htc desire 626_2021_08_31_100media_imag5924.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:45",
        "exifDate": "2021-08-31 15:04:09",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "b9301a37-b831-4883-8048-2ab1a403644a",
        "hash": "515a5b0dd5a81b8c9f43f8bab6b212a9cd0259d7045a2e073f618e7cb2455fa0",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\0.039.061.011.06.040.054.033.051.02021-08-31_145429_htc htc desire 626_2021_08_31_100media_imag5918.jpg",
        "relativeToPath": "\\0.039.061.011.06.040.054.033.051.02021-08-31_145429_htc htc desire 626_2021_08_31_100media_imag5918.jpg",
        "filename": "0.039.061.011.06.040.054.033.051.02021-08-31_145429_htc htc desire 626_2021_08_31_100media_imag5918.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:33",
        "exifDate": "2021-08-31 14:54:29",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "1e90b179-94e8-4652-a00c-f6174d8d42d9",
        "hash": "83fce7684d22cc741208b387012fe5f3f8ed98e8e31e16006c00497afbc30498",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\71.061.080.048.023.077.012.075.098.02021-08-31_150246_htc htc desire 626_2021_08_31_100media_imag5921.jpg",
        "relativeToPath": "\\71.061.080.048.023.077.012.075.098.02021-08-31_150246_htc htc desire 626_2021_08_31_100media_imag5921.jpg",
        "filename": "71.061.080.048.023.077.012.075.098.02021-08-31_150246_htc htc desire 626_2021_08_31_100media_imag5921.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 17:12:37",
        "exifDate": "2021-08-31 15:02:46",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    },
    {
        "id": "2beb54fe-8415-4634-b3c9-2cc6c2eb5e3c",
        "hash": "9d8a70b8409503394b56127c5c21b49bbd0fe6d7ae5b90b582dd47045ffb7d5e",
        "path": "Y:\\50-Phototheque\\##Events 10-15 j\\parc anonty\\5.052.082.014.075.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5915.jpg",
        "relativeToPath": "\\5.052.082.014.075.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5915.jpg",
        "filename": "5.052.082.014.075.0htc htc desire 626_100media_htc htc desire 626_2022_08_31_100media_imag5915.jpg",
        "extension": "jpg",
        "createdDate": "2025-03-27 21:38:59",
        "exifDate": "2021-08-31 14:54:20",
        "createDate": null,
        "rating": 0,
        "label": null,
        "pick": 0,
        "keywords": []
    }
];

export const getPhotoshootTypes = async () => {
    if (import.meta.env.DEV) {
        return MOCK_SEANCE_TYPES;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/photoshoot-type`);
        if (!response.ok) {
            throw new Error('Failed to fetch seance types');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching seance types:', error);
        throw error;
    }
};

export const getPhotoShoot = async (photoshootTypeName: string) => {
    if (import.meta.env.DEV) {
        return MOCK_SEANCE_photoShoot;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/photoshoot-type/${photoshootTypeName}/photoshootlist`);
        if (!response.ok) {
            throw new Error('Failed to fetch seance photoShoot');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching seance photoShoot:', error);
        throw error;
    }
};

export const getPhotos = async (photoshootTypeName: string, photoshootName: string, useCache: boolean = true) => {
    if (import.meta.env.DEV) {
        return MOCK_PHOTOS;
    }
    try {
        let urlToCall = `${API_BASE_URL}/photoshoot/${photoshootTypeName}/${photoshootName}`;
        if (!useCache) {
            urlToCall = `${API_BASE_URL}/photoshoot/${photoshootTypeName}/${photoshootName}/nocache`;
        }
        const response = await fetch(urlToCall);

        if (!response.ok) {
            throw new Error('Failed to fetch seance photoShoot');
        }
        const data = await response.json();
        return data?.groupOfPhoto?.photos ?? []; // return only the photos array
    } catch (error) {
        console.error('Error fetching seance photoShoot:', error);
        throw error;
    }
};

export const updatePhoto = async (photoId: string, updates: any) => {
    console.trace("updatePhoto", photoId, JSON.stringify(updates))
    if (import.meta.env.DEV) {
        const photoIndex = MOCK_PHOTOS.findIndex(p => p.id === photoId);
        if (photoIndex !== -1) {
            MOCK_PHOTOS[photoIndex] = {...MOCK_PHOTOS[photoIndex], ...updates};
            return MOCK_PHOTOS[photoIndex];
        }
        throw new Error('Photo not found');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/photo/${photoId}/metadata`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error('Failed to update photo');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating photo:', error);
        throw error;
    }
};


export const updatePhotoStar = async (photoId: string, nbStar: number) => {
    console.trace("updatePhoto", photoId, JSON.stringify(nbStar))
    if (import.meta.env.DEV) {
        const photoIndex = MOCK_PHOTOS.findIndex(p => p.id === photoId);
        if (photoIndex !== -1) {
            MOCK_PHOTOS[photoIndex] = {...MOCK_PHOTOS[photoIndex], rating: nbStar};
            return MOCK_PHOTOS[photoIndex];
        }
        throw new Error('Photo not found');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/photo/${photoId}/star/${nbStar}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error('Failed to update photo');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating photo:', error);
        throw error;
    }
};
export const updatePhotoPick = async (photoId: string, valuePick: number) => {
    console.trace("updatePhoto", photoId, JSON.stringify(valuePick))
    if (import.meta.env.DEV) {
        const photoIndex = MOCK_PHOTOS.findIndex(p => p.id === photoId);
        if (photoIndex !== -1) {
            MOCK_PHOTOS[photoIndex] = {...MOCK_PHOTOS[photoIndex], pick: valuePick};
            return MOCK_PHOTOS[photoIndex];
        }
        throw new Error('Photo not found');
    }
    try {
        const response = await fetch(`${API_BASE_URL}/photo/${photoId}/pick/${valuePick}`, {
            method: 'PUT'
        });

        if (!response.ok) {
            throw new Error('Failed to update photo');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating photo:', error);
        throw error;
    }
};

// Mock API call for photoShoot validation
export const validatephotoShoot = async (photoshootTypeName: string, photoshootName: string): Promise<'validate' | 'invalid'> => {
    console.trace("validatephotoShoot", photoshootTypeName, photoshootName)
    if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock response - 70% chance of being valid
        return Math.random() > 0.3 ? 'validate' : 'invalid';
    }
    try {
        const response = await fetch(`${API_BASE_URL}/photoshoot/${photoshootTypeName}/${photoshootName}/validate`);

        if (!response.ok) {
            return 'invalid';
        }

        const result = await response.json();

        if (result.valid === true) {
            return 'validate';
        } else {
            return 'invalid';
        }
    } catch (error) {
        console.error('Error updating photo:', error);
        throw error;
    }
};

// Mock API call to get photoShoot name fields configuration
// export const getphotoshootNameFields = async (PhotoshootType: string) => {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 800));
//
//   // Mock response with random number of fields (2-4) and acceptable words
//   const fieldCount = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4 fields
//
//   const mockFieldOptions = [
//     ['2023', '2024', '2025'],
//     ['event', 'meeting', 'conference', 'workshop'],
//     ['paris', 'london', 'berlin', 'madrid'],
//     ['team', 'client', 'partner', 'internal'],
//     ['morning', 'afternoon', 'evening'],
//     ['indoor', 'outdoor', 'hybrid']
//   ];
//
//   const fields = [];
//   for (let i = 0; i < fieldCount; i++) {
//     fields.push({
//       id: `field_${i + 1}`,
//       label: `Field ${i + 1}`,
//       options: mockFieldOptions[i % mockFieldOptions.length]
//     });
//   }
//
//   return {
//     fieldCount,
//     fields
//   };
// };

// Mock API call to update photoShoot name
export const updatephotoshootName = async (
    photoshootTypeName: string, oldPhotoshootName: string,
    photoshootNameNewDTO: PhotoshootNameNewDTO
) => {
    console.trace('Updating photoShoot name:', {
        photoshootTypeName,
        oldPhotoshootName,
        photoshootNameNewDTO
    });
    if (import.meta.env.DEV) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Mock successful response
        return 'validate';
    }
    try {
        const response = await fetch(`${API_BASE_URL}/photoshoot/${photoshootTypeName}/${oldPhotoshootName}/rename`,{
        method: 'PUT',
            headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(photoshootNameNewDTO),
    });

        const result = await response.json();

        if (result.valid === true) {
            return 'validate';
        } else {
            return result.message;
        }
    } catch (error) {
        console.error('Error updating photo:', error);
        throw error;
    }
};

export const fetchThumbnail = async (photoUUID: string) => {
    console.trace("fetchThumbnail", photoUUID)

    let retMockJpg;
    if (import.meta.env.DEV) {
        if (Math.random() > 0.8) {
            retMockJpg = "/no_images.svg"
        } else {
            retMockJpg = Math.random() > 0.5 ? "/fetchThumbnailMock1.jpg" : "/fetchThumbnailMock2.jpg";
        }
        console.trace("retMockJpg", retMockJpg)
        return retMockJpg
    }

    const response = await fetch(`${API_BASE_URL}/thumbnails/${photoUUID}`);
    if (!response.ok) throw new Error('Failed to load thumbnail');
    const blob = await response.blob();
    return URL.createObjectURL(blob);
}
