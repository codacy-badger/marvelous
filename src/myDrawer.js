import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import classNames from "classnames";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import SvgIcon from "@material-ui/core/SvgIcon";



import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import Collapse from "@material-ui/core/Collapse";


import { fromJS } from "immutable";
import MAP_STYLE from "./mbstyle/style.json";

import ListSubheader from "@material-ui/core/ListSubheader";

import VillagesIcon from "./mbstyle/icons/village-11.svg";
import MuseumIcon from "./mbstyle/icons/museum-11.svg";
import UnescoIcon from "./mbstyle/icons/World_Heritage_Logo_global_small.svg";
import JardinsIcon from "./mbstyle/icons/Jardins_Remarquables_15.svg";
import GSFIcon from "./mbstyle/icons/GSF.svg";
import AOPIcon from "./mbstyle/icons/AOP.svg";


import "./App.css";

const defaultMapStyle = fromJS(MAP_STYLE);

const categories = ["Unesco", "Villages", "Museum", "AOP", "Jardins", "GSF", "MN"];

// Layer id patterns by category
const layerSelector = {
    Museum: /listeetlocalisationdesmuseesdefrance/,
    Villages: /villages-frenchcorrected-3gqhy6/,
    Unesco: /whs-frenchcorrected-dq63pv/,
    AOP: /n-inao-aop-fr-16md1w/,
    Jardins: /jardinfr-8nabpa/,
    GSF: /gsf-frenchcorrected/,
    MN: /edifice-geres-par-les-monumen-3inr6v/
};

function HomeIcon(props) {
    return (
        <SvgIcon {...props}>
              <circle cx="10" cy="10" r="9"/>
        </SvgIcon>
    );
}

const drawerWidth = 240;

const styles = theme => ({

    root: {
        display: "flex"
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: "none"
    },
    title: {
        flexGrow: 0
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        width: 0,//theme.spacing.unit * 7,
        // [theme.breakpoints.up("sm")]: {
        //     width: theme.spacing.unit * 9
        // }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 0,
        padding: theme.spacing.unit * 0
    },
    icon:{
        width:25
    }
});

class MyDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibility: { Museum: false, Villages: true, Unesco: true, AOP: false, Jardins: true, GSF: true, MN: true },
            // Drawer opened per Default
            open: true,
            list1Open: true,

        };
        this._defaultLayers = defaultMapStyle.get("layers");
        if (window.innerWidth < 600) {
            // Close Drawer per default for small screens
            this.state.open = false;
        }
    }

    _onVisibilityChange(name, event) {
        const visibility = { ...this.state.visibility, [name]: event.target.checked };
        this.setState({ visibility });
        this._updateMapStyle({
            ...this.state,
            visibility
        });
    }

    // handleToggle = value => () => {
    //     const { checked } = this.state;
    //     const currentIndex = checked.indexOf(value);
    //     const newChecked = [...checked];

    //     if (currentIndex === -1) {
    //       newChecked.push(value);
    //     } else {
    //       newChecked.splice(currentIndex, 1);
    //     }

    //     this.setState({
    //       checked: newChecked,
    //     });
    //   };

    _updateMapStyle({ visibility }) {
        const layers = this._defaultLayers.filter(
            layer => {
                const id = layer.get("id");
                return categories.every(
                    name =>
                        visibility[name] ||
                        !layerSelector[name].test(id)
                );
            }
        );
        defaultMapStyle.set("layers", layers);
        this.props.onChange(defaultMapStyle.set("layers", layers));
    }

    componentDidMount() {
        this._updateMapStyle(this.state);
    }

    state = {
        open: true
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleClick = () => {
        this.setState(state => ({ list1Open: !state.list1Open }));
    };

    render() {
        const { classes } = this.props;

        return <React.Fragment>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar ref={elem => (this.AppBar = elem)} position="absolute" className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                        <IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" noWrap className={classes.title}>
                            France découverte
                  </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer ref={elem => (this.Drawer = elem)} variant="permanent" classes={{ paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose) }} open={this.state.open}>
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose} aria-label="Close drawer">
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                        <ListItem button onClick={this.handleClick} aria-label="Open Culture et Patrimoine">

                            <ListSubheader>Culture et Patrimoine</ListSubheader>
                            {this.state.list1Open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.list1Open} timeout="auto" unmountOnExit>

                        <List>
                            <ListItem key={"Villages"} dense button className={classes.listItem} >
                                <Checkbox tabIndex={-1} checked={this.state.visibility["Villages"]} onChange={this._onVisibilityChange.bind(this, "Villages")} value="true" color="default" aria-label="VillagesCheckbox" htmlFor="VillagesListItemText" id = "VillagesCheckbox" disableRipple />
                                <ListItemText htmlFor="VillagesCheckbox" id="VillagesListItemText" primary={"Villages"} title="Plus beaux Villages de France" />
                                <ListItemSecondaryAction>
                                    <img className={classes.icon} alt="Plus beaux Villages de France" title="Plus beaux Villages de France" src={VillagesIcon} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem key={"Unesco"} dense button className={classes.listItem} >
                                <Checkbox tabIndex={-1} checked={this.state.visibility["Unesco"]} onChange={this._onVisibilityChange.bind(this, "Unesco")} value="true" color="default" id="UnescoCheckbox" disableRipple />
                                <ListItemText htmlFor="UnescoCheckbox" primary={"Unesco"} title="Unesco World Heritage" />
                                <ListItemSecondaryAction >
                                    <img className={classes.icon} alt="Unesco World Heritage" title="Unesco World Heritage" src={UnescoIcon} />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem key={"Jardins"} dense button className={classes.listItem} >
                                <Checkbox tabIndex={-1} checked={this.state.visibility["Jardins"]} onChange={this._onVisibilityChange.bind(this, "Jardins")} value="true" color="default" id="JardinsCheckbox" disableRipple />
                                <ListItemText htmlFor="JardinsCheckbox" primary={"Jardins"} title="Jardins remarquables" />
                                <ListItemSecondaryAction >
                                    <img className={classes.icon} alt="Jardins remarquables" title="Jardins remarquables" src={JardinsIcon} />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem key={"GSF"} dense button className={classes.listItem}>
                                <Checkbox tabIndex={-1} checked={this.state.visibility["GSF"]} onChange={this._onVisibilityChange.bind(this, "GSF")} value="true" color="default" id="GSFCheckbox" disableRipple />
                                <ListItemText htmlFor="GSFCheckbox" primary={"Grands Sites"} title="Grand Site de France" />
                                <ListItemSecondaryAction>
                                    <img className={classes.icon} alt="Grand Site de France" title="Grand Site de France" src={GSFIcon} />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem key={"MN"} dense button className={classes.listItem}>
                                <Checkbox tabIndex={-1} checked={this.state.visibility["MN"]} onChange={this._onVisibilityChange.bind(this, "MN")} value="true" color="default" aria-label="MNCheckbox" disableRipple />
                                <ListItemText id="MonumentsListItemText" primary={"Monuments"} title="Monuments Nationaux"/>
                                <ListItemSecondaryAction>
                                <HomeIcon className={classes.icon} style={{color:"#1f08a6"}} alt="Monuments Nationaux" title="Monuments Nationaux"/>
                                    {/* <img className={classes.icon} alt="Monuments Nationaux" title="Monuments Nationaux" src={GSFIcon} /> */}
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem key={"Museum"} dense button className={classes.listItem} >
                                <Checkbox tabIndex={-1} checked={this.state.visibility["Museum"]} onChange={this._onVisibilityChange.bind(this, "Museum")} value="true" color="default" aria-label="MuseumCheckbox" disableRipple />
                                <ListItemText primary={"Museum"} title="Museum"/>
                                <ListItemSecondaryAction>
                                    <img className={classes.icon} alt="Museum" title="Museum" src={MuseumIcon} />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem key={"AOP"} dense button className={classes.listItem} >
                                <Checkbox tabIndex={-1} checked={this.state.visibility["AOP"]} onChange={this._onVisibilityChange.bind(this, "AOP")} value="true" color="default" aria-label="AOPCheckbox" disableRipple />
                                <ListItemText primary={"AOP"} title="Apellations d'origine controllée"/>
                                <ListItemSecondaryAction>
                                    <img className={classes.icon} alt="Apellations d'origine controllée" title="Apellations d'origine controllée" src={AOPIcon} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            </List>

                        
                    </Collapse>
                </Drawer>
            </div>
        </React.Fragment>;
    }
}
MyDrawer.propTypes = {
    classes: PropTypes.object.isRequired
};
export default withStyles(styles)(MyDrawer);