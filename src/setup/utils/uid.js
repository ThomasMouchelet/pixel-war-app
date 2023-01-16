
const getUidFromLocalstorage = () => {
    const uid = localStorage.getItem("uid");
    return uid;
};

export {
    getUidFromLocalstorage
}