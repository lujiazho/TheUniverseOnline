import React from 'react';
import './explore.css';
import './leaflet/leaflet.css';
import './leaflet/leaflet.js';
import {connect} from "dva";

const namespace = 'map';

const getColor = () => {
    // return '#' + Math.floor(Math.random()*16777215).toString(16);
    return '#fff';
}
const style = (feature) => {
    // style of map and its edge
    return {
        weight: 2,
        opacity: 1,
        color: '#aaa',
        dashArray: '3',
        fillOpacity: 0.1,
        fillColor: getColor()
    };
}

@connect((state) => {
    return {
        statesData : state[namespace].statesData,
        picData : state[namespace].picData
    }
}, (dispatch) => {
    return {
        initData : () => {
            dispatch({
                type : namespace + "/initData"
            });
        }
    }
})
class Explore extends React.Component{
    componentDidMount() {

        this.props.initData();
        this.picNum = this.props.picData['nums'];
        this.path = ''; // for img

        this.map = L.map('map').setView([20, 0], 2);

        // add global maps
        var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 1
        }).addTo(this.map);

        // control that shows state info on hover
        this.info = L.control();
        this.info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };
        this.info.update = function (props, num=0) {
            this._div.innerHTML = '<h4>OpenStreetMap</h4>' +  (props ?
                '<b>' + props.name + '</b><br/>' + 'current image : ' + num : 'Hover over a state');
        };
        this.info.addTo(this.map);

        this.popup = L.popup();
        this.geojson = '';
        this.show = (e) => {
            if (this.path === "")
                this.popup.setLatLng(e.latlng)
                    .setContent('Nothing for Now')
                    .openOn(this.map);
            else
                this.popup.setLatLng(e.latlng)
                    .setContent('<img src=' + this.path + ' height="150px"/>')
                    .openOn(this.map);
        }
        this.onMapMove = (e) => {
            this.show(e);
        }
        this.highlightFeature = (e) => {
            var layer = e.target;

            layer.setStyle({
                weight: 3,
                color: '#4315aa',
                dashArray: '',
                fillOpacity: 0.7
            });

            // in case highlight color blocked by edge of map
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

            var name = e.target.feature.properties.name;
            // update info
            this.info.update(layer.feature.properties, this.picNum[name]);
            // update img
            var pick = Math.floor(Math.random() * this.picNum[name]) + 1;

            if (name.length > 3 && name.substring(name.length - 3) === 'USA'){
                this.path = '/earth/USA/' + name.substring(0, name.length - 4) + '/' + pick + '.jfif';
            }else if (/[\u4E00-\u9FA5]+/g.test(name)){
                this.path = '/earth/CHN/' + name + '/' + pick + '.jfif';
            }else{
                this.path = "/earth/" + name + '/' + pick + '.jfif';
            }
            if (this.picNum[name] === 0)
                this.path = ""
            this.path = this.path.replace(/\s/g,"-");
        }
        this.resetHighlight = (e) => {
            this.geojson.resetStyle(e.target);
            this.info.update();
            this.popup.close(this.map);
        }
        this.zoomToFeature = (e) => {
            this.map.fitBounds(e.target.getBounds());
        }
        this.onEachFeature = (feature, layer) => {
            layer.on({
                mouseover: this.highlightFeature,
                mouseout: this.resetHighlight,
                click: this.zoomToFeature,
                mousemove: this.onMapMove
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.picNum = this.props.picData["nums"];
        this.geojson = L.geoJson(this.props.statesData, {
            style: style,
            onEachFeature: this.onEachFeature
        }).addTo(this.map);
    }

    render() {
        return (
            <div id='map'>

            </div>
        );
    }
}

export default Explore;