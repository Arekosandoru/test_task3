/*
    Что требуется сделать:
    Страница с двумя кнопками подключенными к церебрал. Одна кнопка называется "показать историю реестра", вторая "показать историю пользователя".
    При нажатии на любую из кнопок должен отобразиться компонент истории изменений, но с разными данными (разные запросы GraphQL).
    В случае история пользователя, в запрос передается UUID пользователя (например 3182), в случае истории реестра - никаких ID не передаем.

    Достаточно просто чтобы каждая кнопка открывала/закрывала компонент. А при последовательном нажатии (открыли А, открыли Б) - компонент переключался.

    GQL запрос который вам нужен - Query-> Users -> History

    Все UI элементы строятся на Material-UI.
*/

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import {connect} from '@cerebral/react';
import DialogForm from "./DialogForm";
import appController from '../../controller';
import {state, sequences} from "cerebral";

const controller = appController();

class Overview extends React.Component {
  state = {
    open: false,
  };

  openRegistryHistory = controller.get(sequences.openRegistryHistory);

  openUserHistory = controller.get(sequences.openUserHistory);

  showHideModal = (type) => {
    if (type === 'registry') this.openRegistryHistory();

    if (type === 'user') {
      const userId = 90814;
      this.openUserHistory({userId});
    }

    this.setState(prevState => ({open: !prevState.open}));
  };

  render() {
    const {classes, get} = this.props;
    const {open} = this.state;
    const isLoading = get(state.isLoading);
    const history = get(state.history);

    return (
      <div className={classes.root}>
        <div className={classes.menu}>
          <Button
            className={classes.button} variant="contained" color="primary"
            onClick={() => this.showHideModal('registry')}
          >
            Показать историю реестра
          </Button>
          <Button
            className={classes.button} variant="contained" color="primary"
            onClick={() => this.showHideModal('user')}
          >
            Показать историю пользователя
          </Button>
        </div>
        <DialogForm
          history={history}
          isLoading={isLoading}
          get={get}
          open={open}
          handleClose={this.showHideModal}
        />
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  menu: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 280,
  },
  button: {
    marginBottom: theme.spacing.unit,
  },
});

Overview.propTypes = {
  classes: PropTypes.object.isRequired,
  get: PropTypes.func,
};

export default withStyles(styles)(connect(Overview));
