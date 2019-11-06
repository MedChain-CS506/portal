import firebase, { auth, firestore } from '../firebase';

const authentication = {};

authentication.signUp = fields =>
  new Promise((resolve, reject) => {
    if (!fields) {
      reject();
      return;
    }

    const { firstName } = fields;
    const { lastName } = fields;
    const { email } = fields;
    const { password } = fields;

    if (!firstName || !lastName || !email || !password) {
      reject();
      return;
    }

    const { currentUser } = auth;
    console.log('currentUser:', currentUser);

    // IF THERE IS A CURRENT USER, DON'T SIGN THEM UP
    if (currentUser) {
      reject();
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        const { user } = value;

        if (!user) {
          reject();
          return;
        }

        const { uid } = user;

        if (!uid) {
          reject();
          return;
        }

        // STORE THEM IN THE FIREBASE
        const reference = firestore.collection('users').doc(uid);

        if (!reference) {
          reject();
          return;
        }

        reference
          .set({
            firstName,
            lastName,
          })
          .then(val => {
            resolve(val);
          })
          .catch(reason => {
            reject(reason);
          });
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.signIn = (email, password) =>
  new Promise((resolve, reject) => {
    if (!email || !password) {
      reject();
      return;
    }

    const { currentUser } = auth;

    if (currentUser) {
      reject();
      return;
    }

    auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.signOut = () =>
  new Promise((resolve, reject) => {
    const { currentUser } = auth;

    if (!currentUser) {
      reject();
      return;
    }

    auth
      .signOut()
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.resetPassword = email =>
  new Promise((resolve, reject) => {
    if (!email) {
      reject();

      return;
    }

    const { currentUser } = auth;

    if (currentUser) {
      reject();

      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.changeFirstName = firstName =>
  new Promise((resolve, reject) => {
    if (!firstName) {
      reject();

      return;
    }

    const { currentUser } = auth;

    if (!currentUser) {
      reject();

      return;
    }

    const { uid } = currentUser;

    if (!uid) {
      reject();

      return;
    }

    const reference = firestore.collection('users').doc(uid);

    if (!reference) {
      reject();

      return;
    }

    reference
      .update({
        firstName,
      })
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.changeLastName = lastName =>
  new Promise((resolve, reject) => {
    if (!lastName) {
      reject();

      return;
    }

    const { currentUser } = auth;

    if (!currentUser) {
      reject();

      return;
    }

    const { uid } = currentUser;

    if (!uid) {
      reject();

      return;
    }

    const reference = firestore.collection('users').doc(uid);

    if (!reference) {
      reject();

      return;
    }

    reference
      .update({
        lastName,
      })
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.changeEmail = email =>
  new Promise((resolve, reject) => {
    if (!email) {
      reject();

      return;
    }

    const { currentUser } = auth;

    if (!currentUser) {
      reject();

      return;
    }

    const { uid } = currentUser;

    if (!uid) {
      reject();

      return;
    }

    currentUser
      .updateEmail(email)
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.changePassword = password =>
  new Promise((resolve, reject) => {
    if (!password) {
      reject();

      return;
    }

    const { currentUser } = auth;

    if (!currentUser) {
      reject();

      return;
    }

    const { uid } = currentUser;

    if (!uid) {
      reject();

      return;
    }

    currentUser
      .updatePassword(password)
      .then(() => {
        const reference = firestore.collection('users').doc(uid);

        if (!reference) {
          reject();

          return;
        }

        reference
          .update({
            lastPasswordChange: firebase.firestore.FieldValue.serverTimestamp(), // eslint-disable-line
          })
          .then(value => {
            resolve(value);
          })
          .catch(reason => {
            reject(reason);
          });
      })
      .catch(reason => {
        reject(reason);
      });
  });

authentication.deleteAccount = () =>
  new Promise((resolve, reject) => {
    const { currentUser } = auth;

    if (!currentUser) {
      reject();

      return;
    }

    currentUser
      .delete()
      .then(value => {
        resolve(value);
      })
      .catch(reason => {
        reject(reason);
      });
  });

export default authentication;
