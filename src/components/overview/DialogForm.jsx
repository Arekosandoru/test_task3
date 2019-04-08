import React, {Component} from "react";
import classnames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import History from "./History";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";

class DialogForm extends Component {
  state = {
    showFilters: false,
  };

  showHideFilters = () => {
    this.setState(prevState => ({showFilters: !prevState.showFilters}));
  };

  render() {
    const {classes, handleClose, open, history, isLoading} = this.props;
    const {showFilters} = this.state;
    let content = null;

    if (isLoading) {
      content = <CircularProgress className={classes.progress}/>;
    } else if (history.length) {
      content = history.map(h => <History data={h} key={h.id}/>);
    } else {
      content = <Typography align="center" variant="body1">Ничего не найдено :(</Typography>;
    }

    console.log('history', history);
    console.log('history', JSON.stringify(history));

    return (
      <Dialog open={open} onClose={handleClose} classes={{paper: classes.dialogPaper}}>
        <div className={classes.header}>
          <Typography variant="h6">
            История изменений
          </Typography>
          <div className={classes.controls}>
            <div className={classnames(classes.blueStrips, {open: showFilters})} onClick={this.showHideFilters}/>
            <div className={classes.closeBtnIcon} onClick={handleClose}/>
          </div>
        </div>
        <div className={classes.expansionPanelWrap}>
          <ExpansionPanel
            square
            expanded={showFilters}
          >
            <ExpansionPanelDetails className={classes.expansionPanelRoot}>
              <div className={classes.stats}>
                <div className={classnames(classes.statField, {selected: false})}>
                  <span>Добавлен собственник</span>
                  <span>472</span>
                </div>
                <div className={classnames(classes.statField, {selected: false})}>
                  <span>Импорт и экспорт</span>
                  <span>18</span>
                </div>
                <div className={classnames(classes.statField, {selected: true})}>
                  <span>Удален собственник</span>
                  <span>34</span>
                </div>
                <div className={classnames(classes.statField, {selected: true})}>
                  <span>Добавлен собственник</span>
                  <span>2</span>
                </div>
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
        <DialogContent className={classes.modalContent}>
          {content}
        </DialogContent>
      </Dialog>
    );
  }
}

const styles = theme => ({
  dialogPaper: {
    maxWidth: 475,
    background: theme.palette.white,
    boxShadow: '0px 8px 16px rgba(176, 190, 197, 0.48)',
    borderRadius: 3,
  },
  header: {
    padding: theme.spacing.unit * 2,
    minHeight: 64,
    display: 'inline-flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h6': {
      fontWeight: 500,
      fontFamily: 'Fira Sans',
      fontStyle: 'normal',
      lineHeight: '28px',
      fontSize: '20px',
      letterSpacing: '0.15px',
      color: theme.palette.lightBlack,
    },
    '& button': {
      fontSize: 16,
      fontWeight: 600,
      color: theme.palette.darkGray,
    }
  },
  controls: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  blueStrips: {
    display: 'inline-block',
    marginRight: theme.spacing.unit * 2,
    width: 24,
    height: 24,
    background: 'url(icons/filter-variant.svg) no-repeat',
    backgroundSize: '100%',
    transition: 'transform .3s ease-out',
    transform: 'rotate(0deg)',
    cursor: 'pointer',
    '&.open': {
      transform: 'rotate(180deg)',
    },
  },
  closeBtnIcon: {
    display: 'inline-block',
    width: 24,
    height: 24,
    background: 'url(icons/close.png) no-repeat',
    backgroundSize: '100%',
    cursor: 'pointer',
  },
  modalContent: {
    padding: 0,
    minHeight: 150,
    '&::-webkit-scrollbar': {
      width: 6,
      backgroundColor: theme.palette.scrollWhite,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.gray,
    },
},
  stats: {
    borderTop: `1px solid ${theme.palette.gray}`,
    padding: theme.spacing.unit * 2,
  },
  statField: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.unit / 2,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px`,
    borderRadius: 3,
    color: theme.palette.lightBlack,
    cursor: 'pointer',
    '&:hover, &.selected': {
      background: theme.palette.darkestGray,
    },
  },
  expansionPanelWrap: {
    '& > div': {
      boxShadow: 'none',
    },
    '&::before': {
      content: 'none',
    }
  },
  expansionPanelRoot: {
    padding: 0,
  },
  progress: {
    display: 'block',
    margin: `${theme.spacing.unit * 5}px auto`,
  },
});

DialogForm.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.array,
  isLoading: PropTypes.bool,
  get: PropTypes.func,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default withStyles(styles)(DialogForm);
