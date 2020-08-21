import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        color: "#fff"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
        color: "#fff",
        "&:before": {
            border: "none"
        },
        '&:hover:not(.Mui-disabled):before': {
            border: 'none',
        }
    },
    icon: {
        fill: "#fff",
    },
    sortColor: {
        color: "fff"
    }
}));

export default function SortBySelect(props){
    const classes = useStyles();
    const [sortBy, setSortBy] = React.useState('');

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <FormControl className={classes.formControl}>
            {/*<InputLabel shrink id="sortBy" className={classes.sortColor}>*/}
                {/*Sort By*/}
            {/*</InputLabel>*/}
            <Select
                labelId="sortBy"
                id="sort"
                value={sortBy}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}

            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {props.rss && props.rss.length > 0 && props.rss.map((feed, index) => (
                    feed && feed["title"] && <MenuItem key={index} value={feed["title"]}>{feed["title"]}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}