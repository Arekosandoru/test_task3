import React, {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import classnames from "classnames";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const formatFullDate = (date) => {
  return new Date(date).toLocaleString("ru", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  });
};

const formatShortDate = (date) => {
  return new Date(date).toLocaleString("ru", {
    day: 'numeric',
    month: 'long',
  });
};

const getFirstLetterUpperCase = text => text ? text.toString().charAt(0).toLocaleUpperCase() : '';

const getDescriptionTitleText = (text, historyType) => {
  if (!text) return '';

  let result = '';

  if (historyType === 'ChangeProfile') {
    let declension = 'поле';

    if (text.split(', ').length > 1) {
      declension = 'полях';
    }

    result = <span>Изменена запись в {declension} <span style={{fontWeight: 500}}>{text},</span></span>;
  }

  if (historyType === 'ChangeContactInfo') {
    result = <span>Изменена контактная информация: <span style={{fontWeight: 500}}>{text},</span></span>;
  }

  return result;
};

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    }
  }

  handleChange = () => {
    this.setState(prevState => ({expanded: !prevState.expanded}));
  };

  render() {
    const {data, classes} = this.props;
    const {expanded} = this.state;
    const {user, updater} = data;
    const userAvatar = user.avatarUrl
      ? <img className={classes.avatarSmall} src={user.avatarUrl}/>
      : (
        <span className={classnames(classes.avatarSmall, classes.defaultAvatar)}>
        {`${getFirstLetterUpperCase(user.firstName)}${getFirstLetterUpperCase(user.lastName)}`}
      </span>
      );

    const userName = `${user.firstName || ''} ${user.lastName || ''}`;
    const descriptionTitle = getDescriptionTitleText(data.systemText, data.historyType);

    return (
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.header}
          >
            <Grid item xs={1} className={classes.imageWrap}>
              <img
                className={classes.avatar}
                src={updater.avatarUrl}
              />
            </Grid>
            <Grid item xs={10}>
              <p className={classes.title}>{`${updater.firstName || ''} ${updater.lastName || ''}`}</p>
              <p className={classes.time}>{formatFullDate(data.date)}</p>
            </Grid>
            <Grid item xs={1}>
              <ExpandMoreIcon className={classnames(classes.expandIcon, {open: expanded})} onClick={this.handleChange}/>
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.description}>
          <div>{descriptionTitle}</div>
          <p>
            собственник {userAvatar} {userName}, Ленинский проспект д.137 кор. 1, Пом 234
          </p>
        </div>
        <ExpansionPanel className={classes.ExpansionPanel} expanded={expanded} onChange={this.handleChange}>
          <ExpansionPanelDetails className={classes.ExpansionPanelDetails}>
            <div className={classes.description}>
              <p className={classes.time}>Комментарий:</p>
              <p className={classes.commentText}>У {userAvatar} <span
                className={classes.textBold}>{userName}, {formatShortDate(data.date)}</span> изменилось имя. Файлы с
                документами прикреплены. <a href="">www.link.com</a></p>
            </div>
            <div className={classes.attachments}>
              <div><img src="/icons/file-word-box.png" alt="W"/>Filename.doc</div>
              <div><img src="/icons/screen.png" alt="F"/>Filename.jpg</div>
              <div><img src="/icons/file-word-box.png" alt="W"/>Filename.doc</div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 3,
    borderTop: `1px solid ${theme.palette.gray}`,
    fontWeight: 300,
  },
  header: {
    flexWrap: 'nowrap',
    marginBottom: theme.spacing.unit,
  },
  title: {
    lineHeight: '16px',
    fontSize: 12,
    letterSpacing: '0.4px',
    margin: `0 0 ${theme.spacing.unit / 2}px`,
  },
  time: {
    margin: 0,
    lineHeight: '16px',
    fontSize: 12,
    letterSpacing: '0.4px',
    color: theme.palette.lightGray,
  },
  commentText: {
    marginTop: `${theme.spacing.unit}px !important`,
  },
  description: {
    padding: '0 !important',
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: '0.2px',
    margin: 0,
    color: theme.palette.lightBlack,
    '& > p': {
      margin: 0,
    },
    '& > div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& > div > div': {
      display: 'inline',
    }
  },
  textBold: {
    fontWeight: 500,
  },
  imageWrap: {
    display: 'flex',
    alignItems: 'center',
    minWidth: 38,
    maxWidth: 38,
  },
  avatar: {
    width: 29,
    height: 29,
    borderRadius: '50%',
  },
  avatarSmall: {
    width: 16,
    height: 16,
    margin: '0 2px',
    borderRadius: '50%',
    verticalAlign: 'middle',
  },
  defaultAvatar: {
    display: 'inline-block',
    background: theme.palette.orange,
    color: theme.palette.white,
    fontSize: 8,
    fontWeight: 600,
    lineHeight: '16px',
    textAlign: 'center',
  },
  ExpansionPanel: {
    borderRadius: 0,
    margin: 0,
    boxShadow: 'none',
    '&::before': {
      content: 'none',
    }
  },
  ExpansionPanelContent: {
    display: 'block',
    margin: 0,
  },
  ExpansionPanelContentExpanded: {
    margin: '0 !important',
  },
  expandIcon: {
    transition: 'transform .3s ease-out',
    transform: 'rotate(0deg)',
    cursor: 'pointer',
    color: theme.palette.darkGray,
    '&.open': {
      transform: 'rotate(180deg)',
    },
  },
  ExpansionPanelDetails: {
    marginTop: theme.spacing.unit * 2,
    padding: 0,
    display: 'block',
  },
  attachments: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    '& > div': {
      marginTop: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      padding: theme.spacing.unit,
      minWidth: 178,
      minHeight: 36,
      borderRadius: 3,
      background: theme.palette.darkestWhite,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      color: theme.palette.lightBlack,
      lineHeight: '20px',
      fontSize: 14,
      letterSpacing: '0.2px',
      '&:hover': {
        background: theme.palette.darkestGray,
      },
      '& > img': {
        width: 20,
        height: 20,
        marginRight: theme.spacing.unit,
      }
    },
  },
});

History.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  key: PropTypes.string,
};

export default withStyles(styles)(History);
