export function filterTable(filter, setRows, ROWS) {
    const date = new Date(filter.date);
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    if (filter.type && filter.cat && filter.rate) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return el.type === filter.type && 
                el.category.title === filter.cat && 
                el.rate >= filter.rate &&  
                date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
    if (filter.cat && filter.rate) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return el.category.title === filter.cat && el.rate >= filter.rate && date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
    if (filter.cat && filter.type) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return el.category.title === filter.cat && el.type === filter.type && date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
    if (filter.rate && filter.type) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return el.type === filter.cat && el.type === filter.type && date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
    if (filter.rate) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return el.rate >= filter.rate && date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
    if (filter.type) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return el.type === filter.type && date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
    if (filter.cat) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return el.category.title === filter.cat && date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
    if (filter.date) {
        setRows(ROWS.filter(el => {
            const eventFinish = convertStringToDate(el.finish);
            return date.getTime() <= eventFinish.getTime();
        }));
        return;
    }
}

export function convertStringToDate(strDate) {
    const parts = strDate.split('-');
    const dateObj = new Date(parts[2], parts[1] - 1, parts[0]);
    return dateObj;
}
