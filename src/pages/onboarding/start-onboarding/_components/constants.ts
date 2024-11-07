import {
  Child,
  Like,
  MS,
  Order,
  Role,
  Session,
  Subscription,
} from '@prisma/client';

export const localGovernmentAreas = {
  // South East
  Abia: [
    'Aba North',
    'Aba South',
    'Arochukwu',
    'Bende',
    'Isiala Ngwa North',
    'Isiala Ngwa South',
    'Ikwuano',
    'Isuikwuato',
    'Obingwa',
    'Ohafia',
    'Osisioma',
    'Ugwunagbo',
    'Ukwa East',
    'Ukwa West',
    'Umuahia North',
    'Umuahia South',
    'Umu Nneochi',
  ],
  Anambra: [
    'Aguata',
    'Anambra East',
    'Anambra West',
    'Anaocha',
    'Awka North',
    'Awka South',
    'Ayamelum',
    'Dunukofia',
    'Ekwusigo',
    'Idemili North',
    'Idemili South',
    'Ihiala',
    'Njikoka',
    'Nnewi North',
    'Nnewi South',
    'Ogbaru',
    'Onitsha North',
    'Onitsha South',
    'Orumba North',
    'Orumba South',
    'Oyi',
  ],
  Ebonyi: [
    'Abakaliki',
    'Afikpo North',
    'Afikpo South',
    'Ebonyi',
    'Ezza North',
    'Ezza South',
    'Ikwo',
    'Ishielu',
    'Ivo',
    'Izzi',
    'Ohaozara',
    'Ohaukwu',
    'Onicha',
  ],
  Enugu: [
    'Aninri',
    'Awgu',
    'Enugu East',
    'Enugu North',
    'Enugu South',
    'Ezeagu',
    'Igbo Etiti',
    'Igbo Eze North',
    'Igbo Eze South',
    'Isi Uzo',
    'Nkanu East',
    'Nkanu West',
    'Nsukka',
    'Oji River',
    'Udenu',
    'Udi',
    'Uzo Uwani',
  ],
  Imo: [
    'Aboh Mbaise',
    'Ahiazu Mbaise',
    'Ehime Mbano',
    'Ezinihitte Mbaise',
    'Ideato North',
    'Ideato South',
    'Ihitte/Uboma',
    'Ikeduru',
    'Isiala Mbano',
    'Isu',
    'Mbaitoli',
    'Ngor Okpala',
    'Njaba',
    'Nkwerre',
    'Nwangele',
    'Obowo',
    'Oguta',
    'Ohaji/Egbema',
    'Okigwe',
    'Onuimo',
    'Orlu',
    'Orsu',
    'Oru East',
    'Oru West',
    'Owerri Municipal',
    'Owerri North',
    'Owerri West',
  ],

  // South South
  'Akwa Ibom': [
    'Abak',
    'Eastern Obolo',
    'Eket',
    'Esit Eket',
    'Essien Udim',
    'Etim Ekpo',
    'Etinan',
    'Ibeno',
    'Ibesikpo Asutan',
    'Ibiono-Ibom',
    'Ika',
    'Ikono',
    'Ikot Abasi',
    'Ikot Ekpene',
    'Ini',
    'Itu',
    'Mbo',
    'Mkpat-Enin',
    'Nsit-Atai',
    'Nsit-Ibom',
    'Nsit-Ubium',
    'Obot Akara',
    'Okobo',
    'Onna',
    'Oron',
    'Oruk Anam',
    'Udung-Uko',
    'Ukanafun',
    'Uruan',
    'Urue-Offong/Oruko',
    'Uyo',
  ],
  Bayelsa: [
    'Brass',
    'Ekeremor',
    'Kolokuma/Opokuma',
    'Nembe',
    'Ogbia',
    'Sagbama',
    'Southern Ijaw',
    'Yenagoa',
  ],
  'Cross River': [
    'Abi',
    'Akamkpa',
    'Akpabuyo',
    'Bakassi',
    'Bekwarra',
    'Biase',
    'Boki',
    'Calabar Municipal',
    'Calabar South',
    'Etung',
    'Ikom',
    'Obanliku',
    'Obubra',
    'Obudu',
    'Odukpani',
    'Ogoja',
    'Yakuur',
    'Yala',
  ],
  Delta: [
    'Aniocha North',
    'Aniocha South',
    'Bomadi',
    'Burutu',
    'Ethiope East',
    'Ethiope West',
    'Ika North East',
    'Ika South',
    'Isoko North',
    'Isoko South',
    'Ndokwa East',
    'Ndokwa West',
    'Okpe',
    'Oshimili North',
    'Oshimili South',
    'Patani',
    'Sapele',
    'Udu',
    'Ughelli North',
    'Ughelli South',
    'Ukwuani',
    'Uvwie',
    'Warri North',
    'Warri South',
    'Warri South West',
  ],
  Edo: [
    'Akoko-Edo',
    'Egor',
    'Esan Central',
    'Esan North-East',
    'Esan South-East',
    'Esan West',
    'Etsako Central',
    'Etsako East',
    'Etsako West',
    'Igueben',
    'Ikpoba-Okha',
    'Orhionmwon',
    'Oredo',
    'Ovia North-East',
    'Ovia South-West',
    'Owan East',
    'Owan West',
    'Uhunmwonde',
  ],
};

export type PersonalDetailsFormValues = {
  birth_date: string;
  gender: string;
  marital_status: string;
  address: string;
  postcode: string;
  state: string;
  lga: string;
  nationality: string;
  occupation: string;

  nok_first_name: string;
  nok_last_name: string;
  nok_email: string;
  nok_phone: string;
  nok_gender: string;
  nok_nationality: string;
  nok_address: string;
  nok_postcode: string;
};
