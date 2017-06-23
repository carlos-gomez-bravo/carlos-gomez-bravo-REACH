     
//................ PopUps para las capas GeoJson ..............     
  
       	function popUp1(features, layer) {
		layer.bindPopup(
		'<h3>'+'Préfecture'+ '</h3>' +  (features ?
        '<b>Préfecture: </b>' + features.properties.admin1Name 
		+ '<br/><b>Perimetre (km): </b>' + features.properties.Shape_Leng 
		+ '<br/><b>Area (km2): </b>' + features.properties.Shape_Area 
        + '<br/><b>Type des activités: </b>' + features.properties.Zones 
	    : '<b></b>')
		)};
		
		function popUp2(features, layer) {
		layer.bindPopup(
		'<h3>'+'Sous-Préfecture'+ '</h3>' +  (features ?
        '<b>Préfecture: </b>' + features.properties.admin1Name 
		+ '<br/><b>Sous-Préfecture: </b>' + features.properties.admin2Name
		
	    : '<b></b>')
		)};
		
		function popUp3(features, layer) {
		layer.bindPopup(
		'<h3>'+'Commune'+ '</h3>' +  (features ?
        '<b>Préfecture: </b>' + features.properties.admin1Name 
		+ '<br/><b>Sous-Préfecture: </b>' + features.properties.admin2Name
		+ '<br/><b>Commune: </b>' + features.properties.admin3Name
	    : '<b></b>')
		)};
		
		function popUp4(features, layer) {
		layer.bindPopup(
		'<h3>'+'Quartier'+ '</h3>' +  (features ?
        '<b>Préfecture: </b>' + features.properties.admin1Name 
		+ '<br/><b>Sous-Préfecture: </b>' + features.properties.admin2Name
		+ '<br/><b>Commune: </b>' + features.properties.admin3Name
        + '<br/><b>Quartier: </b>' + features.properties.admin4Name
	    : '<b></b>')
		)};


//................ Estilo para las capas ..............

        function style1(feature) {
            return {
            weight:3,
            opacity: 0.7,
            color: '#1E311E',
            fillOpacity: 0,
            fillColor:'green'
            };
        }	

        function style2(feature) {
            return {
            weight:2.5,
			opacity: 0.7,
			color: '#306930',
			fillOpacity: 0,
			fillColor:'black'
			};
        }	

        function style3(feature) {
            return {
			weight:2,
			opacity: 0.7,
			color: '#66E466',
			fillOpacity: 0,
			fillColor:'red'
			};
        }	

        function style4(feature) {
            return {
			weight:1,
			opacity: 0.7,
			color: 'gray',
			fillOpacity: 0,
			fillColor:'gray'
			};
        }		
        

//................  Insertar Mapas base ............................
        
        var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
            thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
        
        var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; ' + osmLink + ' Contributors',
            landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
            thunAttrib = '&copy; '+thunLink+' Contributors',
            esriUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            esriAttrib = '&copy; '+'Esri Contributors';
                           
        var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
            landMap = L.tileLayer(landUrl, {attribution: thunAttrib}),
            esriMap = L.tileLayer(esriUrl, {attribution: esriAttrib}),
            drawnItems = L.featureGroup();
                                   
        var map = L.map('map',{measureControl:true, center: new L.LatLng(5.6613888, 20.65527),zoom:6});
        	
        var baseLayers = {
		   "<span style='color: gray'>Basemap</span>": osmMap,
		   "Landscape": landMap,
           "Image Sattelite": esriMap
        };
		
		
//................ Organización de las capas Geojson .......................
       
	var  adm1 = L.geoJson(Adm_1, {
			style: style1,
			onEachFeature:popUp1,
	}).addTo(map);  
	
	var  adm2 = L.geoJson(Adm_2, {
			style: style2,
			onEachFeature:popUp2,
	}); 
	
	var  adm3 = L.geoJson(Adm_3, {
			style: style3,
			onEachFeature:popUp3,
	}); 
	
	var  adm4 = L.geoJson(Adm_4, {
			style: style4,
			onEachFeature:popUp4,
	}); 

    
//................ Insertar capas CSV .......................

    var  jar = omnivore.csv('cafff.csv').addTo(map);
   


//............ Insertar una leyenda en el mapa ..................




         
//........ Insertar capas GeoJson ............................

          var overlayMaps = {
           
           // "Villages": jar,
           //"Ecoles": ecole,
           //"Points d'eau": L.geoJson(PointEau),
           //"Aerodromes": L.geoJson(Aerodroms),
           //"Rivières": L.geoJson(Rivieres),
           //"Routes": L.geoJson(RoutPral),
           "oins": jar,
           "Quartiers Bangui": adm4,
           "Communes": adm3,
           "Sous Préfectures": adm2,
           "Préfectures": adm1,
          // "Rep. Centrafricaine": L.geoJson(Adm_0),
          'drawlayer': drawnItems
        };   
	     

//........ control de capas e insertamos basemapa .............


    L.control.layers(baseLayers, overlayMaps).addTo(map);   
    osmMap.addTo(map); 
        
   
//........ Añadir escala y Coordenadas raton ..................
        
        L.control.mousePosition().addTo(map);
        
        L.control.scale({
        imperial: false
        }).addTo(map);
        
  
//........ Añadir el control para busqueda por nombre .........

    new L.Control.Search({
    layer: adm1,
    initial: false,
	propertyName: 'admin1Name',
	buildTip: function(text, val) {
			var type = val.layer.feature.properties.admin1Name;
			return '<a href="#" class="'+type+'">'+text+'<b>'+type+'</b></a>';
		}
    }).addTo(map);
    
//........... Añadir el control de apertura de ficheros KMZ ........

        var style = {
            weight: 1,
            opacity: 0.7,
            color: 'gray',
            fillOpacity: 0.5,
            fillColor:'red',
            clickable: false
        };
        L.Control.FileLayerLoad.LABEL = '<img class="icon" src="images/open-folder-icon.png" >';
        L.Control.fileLayerLoad({
            fitBounds: true,
            layerOptions: {
                style: style,
                pointToLayer: function (data, latlng) {
                    return L.circleMarker(
                    latlng,
                    { style: style }
                    );
                }
            }
        }).addTo(map);


// .............. Añadir función de impresión a PDF ..........
        
        L.easyPrint({
            title: 'Export PDF',
            position: 'topleft',
            elementsToHide: 'p, h2'
        }).addTo(map);       
        

//........... Añadir lo de dibujar... pero no me sale .........
      
new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
         }
}).addTo(map);

map.on(L.Draw.Event.CREATED, function(event) {
            var layer = event.layer;
  //view-source:file:///C:/Documents%20and%20Settings/Mati/Mis%20documentos/Downloads/Leaflet.draw-master/Leaflet.draw-master/docs/examples/popup.html
            drawnItems.addLayer(layer);
        });
