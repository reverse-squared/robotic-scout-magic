fetch("/api").then(r=>r.text()).then((text) => {
    //eslint-disable-next-line no-console
    console.log(text);
});