
const getTokenFromLocalstorage = () => {
    const token = localStorage.getItem("token");
    return token;
};

export {
    getTokenFromLocalstorage
}