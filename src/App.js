import React from "react";
import "./App.css";
import axios from "axios";
import NewsTiles from "./NewsTiles";


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

function parse(list, obj){
    for(var i = 0; i < list.length; i++){
        let node = list[i];
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
function convertXmlToJson(result){
    let obj = {};
    let xml = domParser.parseFromString(result.data, "application/xml");
    if(xml){
        let channel = xml.querySelector("channel").children;
        parse(channel, obj);
        console.log(obj);
        return obj;
    }
}

let cnn = [];



// function getFeeds() {
//     let cnn = "http://rss.cnn.com/rss/cnn_topstories.rss";
//     let bbc = "http://feeds.bbci.co.uk/news/rss.xml?edition=uk#";
//
//
//     let feeds = [];
//
//     feeds.push(cnn, bbc, fox, wsj, weather, espn, lifeHacker, nyt, loc);
//
//     feeds.map((feed) => {
//         axios.get("https://cors-anywhere.herokuapp.com/" + feed, {
//             headers: {
//                 'Accept':'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8',
//                 'Content-type':'application/x-www-form-urlencoded'
//             }
//         })
//         .then((response) => {
//             console.log(response.data);
//         })
//         .catch((error) => {
//
//         })
//     });
// }

// function App() {
//     return (
//         <div className="App">
//             <NewsTiles items={cnn.item}/>
//         </div>
//     );
// }

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            cards: []
        }
    }

    componentDidMount(){
        var that = this;
        Promise.all([getCnnFeed(), getBbcFeed(), getFoxFeed(), getWsjFeed(), getWeatherFeed(), getEspnFeed(),
            getLifeHackerFeed(), getNytFeed(), getLocFeed()])
            .then(function (results) {
                let articles = [];
                cnn = convertXmlToJson(results[0]);
                that.setState({cards: cnn.item});
                const bbc = results[1];
                const fox = results[2];
                // let abc = "http://my.abcnews.go.com/rsspublic/world_rss093.xml";
                const wsj = results[3];
                const weather = results[4];
                const espn = results[5];
                const lifeHacker = results[6];
                const nyt = results[7];
                const loc = results[8];
            });
    }

    render(){
        return (
            <div>
                <NewsTiles cards={this.state.cards}/>
            </div>
        )
    }
}

export default App;
