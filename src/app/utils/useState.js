const useState = initialValue => {
    let value = initialValue;

    return [
        () => value,
        newValue => { value = newValue }
    ]
};

export default useState
