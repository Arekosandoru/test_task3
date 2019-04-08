import {client} from '../index';
import gql from "graphql-tag";

const REGISTERY_QUERY = gql`
  query {
    users {
      history {
        id
        historyType
        systemText
        body
        date
        isRead
        user {
          id
          firstName
          lastName
          avatarUrl
        }
        updater {
          id
          firstName
          lastName
          avatarUrl
        }
        documents {
          id
        }
      }
    }
  }
`;

const USER_HISTORY_QUERY = gql`
  query User($userId: Int) {
    users {
      history(userId: $userId) {
        id
        historyType
        systemText
        body
        date
        isRead
        user {
          id
          firstName
          lastName
          avatarUrl
        }
        updater {
          id
          firstName
          lastName
          avatarUrl
        }
        documents {
          id
        }
      }
    }
  }
`;


export default {
  api: {
    getRegistryHistory() {
      return client.query({
        query: REGISTERY_QUERY,
      }).then((res) => res.data);
    },
    getUserHistory(userId) {
      return client.query({
        query: USER_HISTORY_QUERY,
        variables: {userId},
      }).then((res) => res.data);
    }
  }
}
