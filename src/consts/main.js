function createData(id, cat, description, start, finish, type, rate, userId, orgId) {
    return {
        id,
        cat,
        description,
        start,
        finish,
        type,
        rate,
        userId,
        orgId
    };
}

export const ROWS = [
    createData(123, 'Олимпиада', 'Международная научная олимпиада по культурологии', '18.04.2023', '23.04.2023', 'открытая', 2, 1, 2),
    createData(124, 'Конференция', 'Научный журнал «Modern Science» (№ 3 март 2023)', '29.04.2023', '29.04.2023', 'закрытая', 4, 2, 1),
    createData(125, 'Конференция', 'V Международная научно-практическая конференция «Предпринимательство и инновации на рынках Азиатско-Тихоокеанского региона — 2023»', '17.05.2023', '19.05.2023', 'закрытая', 3, 1, 2),
    createData(126, 'Конкурс', 'Международный научный журнал «Психология человека и общества» (3/2023) [РИНЦ]', '23.05.2023', '24.05.2023', 'открытая', 4, 1, 2),
    createData(127, 'Форум', 'XIX Международный научно-практический форум «Интеграция естественных и технических наук в образовательной парадигме XXI века»', '29.04.2023', '30.04.2023', 'открытая', 5, 2, 1),
    createData(128, 'Олимпиада', 'Международная научная олимпиада по английскому языку', '21.04.2023', '21.04.2023', 'закрытая', 4.5, 1, 2),
];

export const headCells = [
    {
        id: 'category_id',
        numeric: false,
        disablePadding: false,
        label: 'Наименование',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'Краткое описание',
    },
    {
        id: 'start',
        numeric: false,
        disablePadding: false,
        label: 'Дата начала',
    },
    {
        id: 'finish',
        numeric: false,
        disablePadding: false,
        label: 'Дата окончания',
    },
    {
        id: 'type',
        numeric: false,
        disablePadding: false,
        label: 'Тип мероприятия',
    },
    {
        id: 'rate',
        numeric: true,
        disablePadding: false,
        label: 'Рейтинг',
    },
];

export const USERS = [
    {
        id: 1,
        name: 'Академия наук',
    },
    {
        id: 2,
        name: 'Универститет связи',
    },
];