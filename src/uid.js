const uid = () => {
    const head = Date.now().toString();
    const tail = Math.random().toString(36).substr(2);
    return head + tail;
};

console.log(uid());

export default uid;