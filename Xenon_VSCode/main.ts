require(["out\\Xenon.js"], function (Xenon) {

    const xenon = new Xenon();
    xenon.Run();
});

require.config({
    baseUrl: "out",
    paths: {
        "some": "Xenon"
    },
    waitSeconds: 15,
});