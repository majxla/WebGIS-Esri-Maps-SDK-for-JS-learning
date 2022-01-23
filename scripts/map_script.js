
// lb1
// require([
//     "esri/Map",
//     "esri/views/SceneView"
// ], (Map, SceneView) => {
//     const map1 = new Map({
//         basemap: "gray-vector"
//     });

//     const view = new SceneView({
//         map: map1,
//         container: "mapDiv",
//         center: [-100.4593, 36.9014],
//         zoom: 3
//     });
// });


// lb2
require([
    'esri/Map',
    'esri/views/MapView',
    'dijit/form/Button',
    'esri/layers/FeatureLayer',
    'esri/Graphic',
    'esri/layers/GraphicsLayer',
    'esri/widgets/BasemapGallery',
    'esri/widgets/Expand',
    'esri/symbols/SimpleMarkerSymbol',
    'esri/renderers/SimpleRenderer',
    'esri/PopupTemplate',
    'esri/layers/GeoJSONLayer',
    'esri/widgets/Legend',
    'esri/widgets/LayerList',
    'esri/widgets/DistanceMeasurement2D',
    'esri/widgets/Search'
], (Map, MapView, Button, FeatureLayer, Graphic, GraphicsLayer, BasemapGallery, Expand, SimpleMarkerSymbol, SimpleRenderer, PopupTemplate, GeoJSONLayer, Legend, LayerList, DistanceMeasurement2D, Search) => {

    const map1 = new Map({
        basemap: "osm"
    });

    const view = new MapView({
        map: map1,
        container: "mapDiv",
        zoom: 9,
        center: [5.992613, 58.937209]
    });

    const zoomIn = new Button({
        onclick: () => {
            view.zoom = view.zoom + 1;
        }
    }, "zoomIn");

    const zoomOut = new Button({
        onclick: () => {
            view.zoom = view.zoom - 1;
        }
    }, "zoomOut");

    // layers

    const boundaryRenderer = new SimpleRenderer({
        type: "simple",
        symbol: {
            type: "simple-fill",
            color: [191, 191, 191, 0.3],
            outline: {
                color: [94, 94, 94],
                width: 1
            }
        }
    });

    const boundaryPopup = new PopupTemplate({
        title: "{name}",
        content: `<div>
                    <ul>
                        <li><b>miasto administracyjne: </b>{miasto_adm}</li>
                        <li><b>powierzchnia: </b>{pow} km2</li>
                        <li><b>liczba ludności: </b>{liczba_lud} (2019)</li>
                        <li><b>liczba gmin: </b>{liczba_gm}</li>
                    </ul>
                </div>`
    });

    const boundary = new GeoJSONLayer({
        url: './geom/rogaland_bound.json',
        renderer: boundaryRenderer,
        popupTemplate: boundaryPopup,
        title: "Zasięg okręgu Rogaland"
    });
    map1.add(boundary);

    var pointsSymbol = new SimpleMarkerSymbol({
        style: "square",
        size: "14px",
        color: [0, 19, 97, 0.6]
    });

    const pointsRenderer = new SimpleRenderer({
        type: "simple",
        symbol: pointsSymbol
    });

    const pointsPop = new PopupTemplate({

        title: "{nazwa}",
        content: `<div>
                    <ul>
                        <li><b>polska nazwa:</b> {nazwa_pol}</li>
                        <li><b>opis:</b> {opis}</li>
                    </ul>
                    </div>`
    });

    const points = new GeoJSONLayer({
        url: "./geom/rogaland.json",
        renderer: pointsRenderer,
        popupTemplate: pointsPop,
        title: "Ciekawe miejsca"
    });

    map1.add(points);

    //widgets

    const bmWg = new BasemapGallery({
        view: view
    });

    const expandWg = new Expand({
        view: view,
        content: bmWg
    });

    view.ui.add(expandWg, {
        position: "top-right"
    });

    const legend = new Expand({
        content: new Legend({
            view: view,
            style: "classic",
            layerInfos: [{
                layer: points
            },
            {
            layer: boundary,
            }]
        })   
    });

    view.ui.add(legend, {
        position: "bottom-left"
    });

    const layerList = new Expand({
        content: new LayerList({
            view: view,
        })
    });

    view.ui.add(layerList, {
        position: "bottom-left",
    });

    const search = new Expand({
        content: new Search({
            view: view,
        })
    });

    view.ui.add(search, {
        position: "bottom-right"
    });


    const measurement = new Expand({
        content: new DistanceMeasurement2D({
            view: view
          })
    })
    view.ui.add(measurement, "bottom-right");

    
    // zooming to selected places

    const preike = document.getElementById("preikestolen");
    preike.addEventListener("click", ()=>{
        view.center = [6.188305000000001,58.98639199999999];
        view.zoom = 15;
    });

    const kjerag = document.getElementById("kjeragbolten");
    kjerag.addEventListener("click", ()=>{
        view.center = [6.577027000000001,59.03467799999999];
        view.zoom = 15;
    });

    const sola = document.getElementById("sola");
    sola.addEventListener("click", ()=>{
        view.center = [5.602228999999487,58.88546399997866];
        view.zoom = 15;
    });

    const wioska = document.getElementById("wioska");
    wioska.addEventListener("click", ()=>{
        view.center = [5.303511,59.353345];
        view.zoom = 15;
    });

    
});

    



