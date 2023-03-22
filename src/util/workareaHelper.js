import store from '../store/index';

export const workAreaIdToName = (id) => {
    const codeTable = store.getters['common/workArea'];
    const foundItem = codeTable.find((item) => {
        if(item.workAreaId === id) {
            return true;
        }
    })

    if (foundItem === undefined) {
        return '알 수 없음'
    }

    return foundItem.workAreaName;
}