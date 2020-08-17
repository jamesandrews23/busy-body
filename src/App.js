import React from "react";
import "./App.css";
import axios from "axios";
import NewsTiles from "./NewsTiles";
import _ from 'lodash';


const domParser = new DOMParser();
const proxy = "https://cors-anywhere.herokuapp.com/";

function getCnnFeed() {
    return axios.get(proxy + 'http://rss.cnn.com/rss/cnn_topstories.rss');
}

function getBbcFeed() {
    return axios.get(proxy + "http://feeds.bbci.co.uk/news/rss.xml#");
}

function getFoxFeed(){
    return axios.get(proxy + "http://feeds.foxnews.com/foxnews/latest");
}

function getWsjFeed(){
    return axios.get(proxy + "https://feeds.a.dj.com/rss/RSSWSJD.xml");
}

function getWeatherFeed(){
    return axios.get(proxy + "https://www.weather.gov/headline_archive.php");
}

function getEspnFeed(){
    return axios.get(proxy + "http://www.espn.com/espn/news/story?page=rssinfo");
}

function getLifeHackerFeed(){
    return axios.get(proxy + "http://www.espn.com/espn/news/story?page=rssinfo");
}

function getNytFeed(){
    return axios.get(proxy + "https://archive.nytimes.com/www.nytimes.com/services/xml/rss/index.html?mcubz=0");
}

function getLocFeed(){
    return axios.get(proxy + "http://www.loc.gov/rss/pao/news.xml");
}

function setObjectType(obj, node){
    let currentValue = obj[node.nodeName];
    if(currentValue){
        if(Array.isArray(currentValue)){
            obj[node.nodeName].push({});
        } else {
            obj[node.nodeName] = [currentValue, {}];
        }
    } else {
        obj[node.nodeName] = {};
    }
}

function parse(xmlDoc, obj){
    if(xmlDoc){
        for(var i = 0; i < xmlDoc.length; i++){
            let node = xmlDoc[i];
            if(node){
                if(node.hasAttributes()){
                    setObjectType(obj, node);
                    let attributes = node.getAttributeNames(); //an array of attribute names
                    let objAttributes = {};
                    for(var j = 0; j < attributes.length; j++){
                        objAttributes["@" + attributes[j]] = node.getAttribute(attributes[j]);
                    }
                    objAttributes["#text"] = node.textContent;
                    if(Array.isArray(obj[node.nodeName])){
                        obj[node.nodeName][obj[node.nodeName].length - 1] = objAttributes;
                    } else {
                        obj[node.nodeName] = objAttributes;
                    }
                } else if(node.children.length > 0){
                    setObjectType(obj, node);
                    parse(node.children, Array.isArray(obj[node.nodeName]) ? obj[node.nodeName][obj[node.nodeName].length - 1] : obj[node.nodeName]); //send obj with that name
                } else {
                    let doc = domParser.parseFromString(node.textContent, 'text/html');
                    obj[node.nodeName] = doc.body.textContent || "";
                }
            }
        }
    } else {
        console.error("List is not defined");
    }
}
/*
 Pattern XML	                        JSON	                                        Access
 1	<e/>	                            "e": null	                                    o.e
 2	<e>text</e>	                        "e": "text"	                                    o.e
 3	<e name="value" />	                "e":{"@name": "value"}	                        o.e["@name"]
 4	<e name="value">text</e>	        "e": { "@name": "value", "#text": "text" }	    o.e["@name"] o.e["#text"]
 5	<e> <a>text</a> <b>text</b> </e>	"e": { "a": "text", "b": "text" }	            o.e.a o.e.b
 6	<e> <a>text</a> <a>text</a> </e>	"e": { "a": ["text", "text"] }	                o.e.a[0] o.e.a[1]
 7	<e> text <a>text</a> </e>	        "e": { "#text": "text", "a": "text" }	        o.e["#text"] o.e.a
 */
function convertXmlToJson(xmlString){
    let obj = {};
    let xml = domParser.parseFromString(xmlString, "application/xml");
    if(xml){
        let channel = xml.querySelector("channel");
        if(channel){
            parse(channel.children, obj);
            console.log(obj);
        } else {
            console.error("Invalid Feed", xml);
        }

    }
    return obj;
}

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            rss: []
        }
    }

    componentDidMount(){
        var that = this;
        Promise.all([getCnnFeed(), getBbcFeed(), getFoxFeed(), getWsjFeed(), getWeatherFeed(), getEspnFeed(),
            getLifeHackerFeed(), getNytFeed(), getLocFeed()])
            .then(function (results) {
                let feeds = results.map(function(result) {
                    let objFeed = convertXmlToJson(result.data);
                    if(!_.isEmpty(objFeed)){
                        return objFeed;
                    }
                });
                that.setState({rss: feeds});
            });
    }

    render(){
        return (
            <div>
                <NewsTiles rss={this.state.rss}/>
            </div>
        )
    }
}

export default App;
