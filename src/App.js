import React from "react";
import "./App.css";
import axios from "axios";
import NewsTiles from "./NewsTiles";
import _ from 'lodash';
import convertXmlToJson from './Parser';

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
                    if(!_.isEmpty(objFeed) && objFeed["channel"]){
                        return objFeed["channel"];
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
