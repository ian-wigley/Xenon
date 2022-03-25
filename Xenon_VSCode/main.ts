require(["out\\Xenon.js"], function (Xenon) {

    var xenon = new Xenon();
    xenon.Run();
});

require.config({
    baseUrl: "out",
    paths: {
        "some": "Xenon"
    },
    waitSeconds: 15,
});