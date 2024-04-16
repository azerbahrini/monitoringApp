const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const session = require('express-session');
const Shift = require('../models/Shift');
const userService = require('../services/user');
const shiftService = require('../services/shift');
const roleService = require('../services/role');
const generator = require('generate-password');
const request = require('request');
const logger = require('../config/logger');
const moment = require('moment');
const {getRolesPermission} = require('../services/authorization/getUserAuthorization');

exports.register = async function (req, res) {
  //Check the validator result
  const { firstName, lastName, email, password, phoneNumber, Level } =
    req.body;

  try {
    //Checking if Email is duplicated
    const userFindUserByProperty = await userService.findUserByProperty({
      email
    });
    if (userFindUserByProperty.status === 'success') {
      if (userFindUserByProperty.data.microsoftId) {
        return res.status(400).json({ message: 'User already Have a Microsoft Account (SSO)' });
      }
      return res.status(400).json({ message: 'User already exists' });
    }
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });
    const resultAddUser = await userService.addUser(
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      null,
      avatar,
      Level,
      null //Microsoft ID
    );
    if (resultAddUser.status === 'error') {
      return res.status(400).json({ message: resultAddUser.err.message });
    }
    if (resultAddUser.status === 'success') {
      const getRole = await roleService.getRoleByLabelService('Global Support');
      if (getRole.status === 'success') {
        const createShift = await shiftService.addShift({
          'role': getRole.data._id,
          'shiftId': null,
          'name': 'Register Shift',
          'updatedShiftAt': moment().utc().format(),
          'startDate': moment().utc().format(),
          'endDate': moment().utc().add(10, 'y').format(),
          'user': resultAddUser.data._id,
          'type': 'app',
          'userMicrosoftId': '000',
          'reference': null
        })
        if (createShift.status === 'error') {
          try {
            await User.findOneAndDelete(resultAddUser.data._id)
          } catch (err) {
            return { err, status: 'user register could not be rolled back' };
          }
        }
      }
    }

    //Notification service
    if (!resultAddUser.data.email.endsWith('@avaxia-group.com')) {
      const mail = {
        email: resultAddUser.data.email,
        key: 'register_confirmation',
        language: 'EN',

        name: resultAddUser.data.firstName + ' ' + resultAddUser.data.lastName
      };
      //Producer.sendMail(mail);

    }
    return res.status(201).json({ message: 'Successfully Registered' });
  } catch (err) {
    logger.error(err.message);
    return res.status(400).json({ message: 'Server error' });
  }
};
exports.login = async function (req, res) {
  const { email, password } = req.body;
  try {
    //Check if the given email exists in the DB
    const resultFindUserByEmail = await userService.findUserByProperty({ email });
    if (resultFindUserByEmail.status == 'error') {
      return res
        .status(
          resultFindUserByEmail.statusCode
            ? resultFindUserByEmail.statusCode
            : 400
        )
        .json({ message: 'Incorrect Confidential' });
    }
    //Check if the given password exists in the DB
    const isMatch = await bcrypt.compare(
      password,
      resultFindUserByEmail.data.password
    );
    if (!isMatch) {
      return res.status(403).json({ message: 'Incorrect credentials' });
    }
    if (!resultFindUserByEmail.data.status) {
      return res.status(401).json({ message: 'The account is not active' });
    }

    //Generate access token
    const payloadAccess = {
      user: {
        id: resultFindUserByEmail.data._id
      }
    };

    const accessTokenValue = jwt.sign(payloadAccess, process.env.JWTSECRET, {
      expiresIn: '10h'
    });

    //Generate refresh token
    const payloadRefresh = {
      user: {
        id: resultFindUserByEmail.data._id
      }
    };

    const refreshTokenValue = jwt.sign(payloadRefresh, process.env.JWTSECRET, {
      expiresIn: '2h'
    });
    //Save token
    const resultChangeSimpleUserInformation =
      await userService.changeSimpleUserInformation(
        { accessToken: accessTokenValue },
        resultFindUserByEmail.data._id
      );
    if (resultChangeSimpleUserInformation.status == 'success') {
      return res.status(200).json({
        data: {
          accessToken: accessTokenValue,
          refreshToken: refreshTokenValue
        }
      });
    }
    if (resultChangeSimpleUserInformation.status == 'error') {
      return res
        .status(
          resultChangeSimpleUserInformation.statusCode
            ? resultChangeSimpleUserInformation.statusCode
            : 400
        )
        .json({
          message: resultChangeSimpleUserInformation.err.message
        });
    }
  } catch (err) {
    logger.error(err.message);
    return res.status(400).json({ message: 'Server error' });
  }
};

// Microsoft Login
exports.microsoftLogin = async function (req, res) {
  const { email } = req.body;
  const accessToken = req.body.accessToken.accessToken;
  session.token = accessToken;
  request(
    {
      url: 'https://graph.microsoft.com/v1.0/me',
      headers: {
        Authorization: 'Bearer' + ' ' + session.token
      },
      rejectUnauthorized: false
    },
    async function (error, response) {
      if (response.statusCode != 200) {
        return res.status(400).json(response);
      } else {
        const userMA = JSON.parse(response.body);
        try {
          //Check if the given email exists in the DB
          const user = await userService.findUserByProperty({ email });

          if (user.statusCode == 404) {
            //Save user
            //Generate password
            const password = generator.generate({
              length: 8,
              numbers: true
            });

            //Saving the user
            const resultAddUser = await userService.addUser(
              userMA.givenName,
              userMA.surname,
              userMA.userPrincipalName,
              password,
              parseInt(userMA.mobilePhone),
              null,
              null,
              null,
              userMA.id //Microsoft ID
            );
            //Sending a confirmation email
            // Let mail = {
            //   Email: user.email,
            //   Key: 'ms_register_confirmation',
            //   Language: 'EN',
            //   Password: password,
            //   Name: user.firstName + ' ' + user.lastName,
            // };

            //Producer.sendMail(mail)

            return res
              .status(201)
              .json({ message: 'the account is now created' });
          }
          if (user.status == 'error' && user.statusCode != 404) {
            return res.status(400).json({ message: 'Connexion problem' });
          }
          if (!user.data.status) {
            return res
              .status(400)
              .json({ message: 'the account is not active' });
          }
          const payloadAccess = {
            user: {
              id: user.data._id
            }
          };

          const accessTokenValue = jwt.sign(
            payloadAccess,
            process.env.JWTSECRET,
            {
              expiresIn: '10h'
            }
          );

          //Generate refresh token
          const payloadRefresh = {
            user: {
              id: user.data._id
            }
          };

          const refreshTokenValue = jwt.sign(
            payloadRefresh,
            process.env.JWTSECRET,
            {
              expiresIn: '2h'
            }
          );
          //Save token
          const resultChangeSimpleUserInformation =
            await userService.changeSimpleUserInformation(
              { accessToken: accessTokenValue },
              user.data._id
            );
          if (resultChangeSimpleUserInformation.status == 'success') {
            return res.status(200).json({
              data: {
                accessToken: accessTokenValue,
                refreshToken: refreshTokenValue
              }
            });
          }
          if (resultChangeSimpleUserInformation.status == 'error') {
            return res
              .status(
                resultChangeSimpleUserInformation.statusCode
                  ? resultChangeSimpleUserInformation.statusCode
                  : 400
              )
              .json({
                message: resultChangeSimpleUserInformation.err.message
              });
          }
        } catch (err) {
          logger.error(err.message);
          return res.status(400).json({ message: 'Server error' });
        }
      }
    }
  );
};

exports.getOneUser = async function (req, res) {
  const date = moment().utc().format();
  const resultFindUserById = await userService.findUserByProperty(
    {
      _id: req.params.id
    },
    [],
    ['-password']
  );
  if (resultFindUserById.status == 'success') {
    const getRole = await roleService.getAllRoleByUser(
      req.params.id,
      date,
      'app'
    );
    if (getRole.status == 'error') {
      return res
        .status(400)
        .json({ message: getRole.err.message });
    } else {
      const editedRole = getRole.data.map((role) => ({ label: role.role.label, _id: role.role._id }));
      const finalRes = { ...resultFindUserById.data, Roles: editedRole };

      return res.status(200).json({ data: finalRes });
    }
  }
  if (resultFindUserById.status == 'error') {
    return res
      .status(
        resultFindUserById.statusCode ? resultFindUserById.statusCode : 400
      )
      .json({ message: resultFindUserById.err.message });
  }
};

//Get Logged user with Roles
exports.getCurrentUser = async function (req, res) {
  try {
    const date = moment().utc().format();
    const accessToken = req.header('x-auth-accessToken');
    if (!accessToken) {
      return res.status(400).json({ message: 'Token not found' });
    }
    const resultFindUserById = await userService.findUserByProperty(
      {
        accessToken: accessToken
      },
      [],
      '-password -accessToken -reset_password_token'
    );
    if (resultFindUserById.status === 'error') {
      return res
        .status(
          resultFindUserById.statusCode ? resultFindUserById.statusCode : 400
        )
        .json({ message: resultFindUserById.err.message });
    }

    const getRole = await roleService.getAllRoleByUser(
      resultFindUserById.data._id,
      date,
      'app'
    );
    if (getRole.status === 'error') {
      return res
        .status(400)
        .json({ message: getRole.err.message });
    }

    const editedRole = getRole.data.map((role) => ({ label: role.role.label, _id: role.role._id }));
    const finalRes = { ...resultFindUserById.data, Roles: editedRole };

    return res.status(200).json({ data: finalRes });

  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

//
exports.getAuthorization = async function (req, res) {
  try {
    const permissions = await getRolesPermission(req.user.id)
    if (!permissions.data) {
      return res.status(401).json({ message: 'No permissions found' });
    }
    const userModules = [];
    permissions.data.map(item => (
      item.populatedModules.map(x => (
        userModules.push(x.path)
      ))
    ));
    const userPermissions = [];
    permissions.data.map(item => (
      item.populatedPermissions.map(x => (
        userPermissions.push(x.code)
      ))
    ));
    return res.status(200).json(
      {
        'data': {
          'listModule': userModules.reduce(
            (accumulator, current) => {
              if (!accumulator.some(x => x === current)) {
                accumulator.push(current)
              }
              return accumulator;
            }, []
          ),
          'listAction': userPermissions.reduce(
            (accumulator, current) => {
              if (!accumulator.some(x => x === current)) {
                accumulator.push(current)
              }
              return accumulator;
            }, []
          )
        }
      }
    );
  } catch (err) {
    logger.error(err.message);
    return res.status(400).json({ message: 'Server error' });
  }
};

exports.getMUser = async function (req, res) {
  const resultGetMicrosoftUser = await userService.findUserByProperty(
    { microsoftId: req.body.microsoftId },
    '',
    '-password'
  );
  if (resultGetMicrosoftUser.status == 'success') {
    return res.status(200).json({ data: resultGetMicrosoftUser.data });
  }
  if (resultGetMicrosoftUser.status == 'error') {
    return res
      .status(
        resultGetMicrosoftUser.statusCode
          ? resultGetMicrosoftUser.statusCode
          : 400
      )
      .json({ message: resultGetMicrosoftUser.err.message });
  }
};

exports.allUser = async function (req, res) {
  const page = req.query.page;
  const size = req.query.size;
  const searchValue = req.query.searchValue?.trim();
  let userWithRole = [];
  let users;
  const roles = await roleService.getRolesForUsers();

  const searchedRoles = roles.data.filter((x) => x.role.label.toUpperCase().includes(searchValue?.toUpperCase()));
  let isSearchingUsingRole = false;
  if (searchedRoles.length > 0) {
    isSearchingUsingRole = true;
  }
  if (isSearchingUsingRole === false) {
      // Filter using name or email
      users = await userService.allUser(page, size, searchValue);
  } else {
      // Filter using role
      roles.data = roles.data.filter((x) => x.role.label.toUpperCase().includes(searchValue?.toUpperCase()));
      users = await userService.allUser(0, 100000); // Disable pagination
    }
  userWithRole = users.data.docs.map((user) => {
    user.Roles = roles.data?.filter((role) => user._id.toString() === role.user?.toString());
    return user;
  });
  if (isSearchingUsingRole){
    userWithRole = userWithRole.filter((x) => x.Roles.length !== 0);
    // Adding missing roles to the search result
    const allRoles = await roleService.getRolesForUsers();
    const TotalUserWithRole = users.data.docs.map((user) => {
      user.Roles = allRoles.data?.filter((role) => user._id.toString() === role.user?.toString());
      return user;
    });
    userWithRole.map((user1) => {
      const abc= TotalUserWithRole.filter((user2) => user1._id.toString() === user2._id.toString()).slice(0, 1);
      user1.Roles = abc[0].Roles;
      return user1;
    });
  }
  //Delete data.docs from obj user to get pagination data
  delete users.data.docs;
  const paginate = users.data;
  if (isSearchingUsingRole){
    paginate.totalDocs = userWithRole.length;
  }
  //Delete userId and roleId from final users.Roles obj
  userWithRole.map((user) => {
    user.Roles?.map((role) => {
      delete role.user;
      delete role.role?._id;
    });
  });

  if (users.status === 'success') {
    return res.status(200).json({ data: userWithRole, ...paginate });
  } else {
    return res
      .status(users.statusCode ? users.statusCode : 400)
      .json({ message: users.err.message });
  }
};

exports.getAllUsers = async function (req, res) {
  try {
    const usersUtc = [];
    // Const profiles = await User.find()
    //   .populate('Level')
    //   .populate({ path: 'RoleHistory', populate: { path: 'Role' } });
    const resultGetAllUser = await userService.getAllUser(
      [
        { path: 'Level' },
        {
          path: 'RoleHistory',
          populate: { path: 'Role' }
        },
        {
          path: 'Role'
        }
      ],
      req.query.page,
      req.query.size
    );

    if (resultGetAllUser.status == 'error') {
      return res.status(400).json({ message: resultGetAllUser.err.message });
    }
    resultGetAllUser.data.docs.forEach((user) => {
      const roles = [];
      const userUtc = user;
      user.RoleHistory.forEach((role) => {
        if (role.startDate && role.endDate) {
          const roleUtc = role;

          (roleUtc.startDate = new Date(
            new Date(role.startDate).getTime() + req.body.timezone * -60000
          )),
            (roleUtc.endDate = new Date(
              new Date(role.endDate).getTime() + req.body.timezone * -60000
            ));

          roles.push(roleUtc);
        }
      });
      userUtc.RoleHistory = roles;
      usersUtc.push(userUtc);
    });
    resultGetAllUser.data.docs = usersUtc;
    res.status(200).json({ data: resultGetAllUser.data });
  } catch (err) {
    logger.error(err.message);
    res.status(400).json({ message: err.message });
  }
};
exports.changeUserInformation = async (req, res) => {
  const resultChangeSimpleUserInformation =
    await userService.changeSimpleUserInformation({ phoneNumber: req.body.phoneNumber }, req.params.userId);
  if (resultChangeSimpleUserInformation.status == 'success') {
    return res.status(200).json({
      data: resultChangeSimpleUserInformation.data
    });
  }
  if (resultChangeSimpleUserInformation.status == 'error') {
    return res
      .status(
        resultChangeSimpleUserInformation.statusCode
          ? resultChangeSimpleUserInformation.statusCode
          : 400
      )
      .json({
        message: resultChangeSimpleUserInformation.err.message
      });
  }
};
exports.changePasswordUser = async (req, res) => {
  const resultChangePassword = await userService.changePassword(
    {
      currentPassword: req.body.currentPassword,
      newPassword: req.body.newPassword
    },
    req.params.userId
  );
  if (resultChangePassword.status === 'success') {
    return res.status(200).json({
      data: resultChangePassword.data
    });
  }
  if (resultChangePassword.status === 'error') {
    return res
      .status(
        resultChangePassword.statusCode ? resultChangePassword.statusCode : 400
      )
      .json({
        message: resultChangePassword.err.message
      });
  }
};

exports.deleteUser = async function (req, res) {
  const result = await userService.deleteUserById(req.params.id);
  if (result.status == 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status == 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

exports.activateUser = async function (req, res) {
  const result = await userService.activateUser(
    req.params.id,
    req.query.reqStatus
  );
  if (result.status === 'success') {
    return res.status(200).json({ data: result.data });
  }
  if (result.status === 'error') {
    return res
      .status(result.statusCode ? result.statusCode : 400)
      .json({ message: result.err.message });
  }
};

exports.updateUser = async function (req, res) {
  const date = moment().utc().format();
  const roles = req.body.roles ? req.body.roles : [];
  const rolesToAdd = [];
  const rolesToDelete = [];
  const resultFindUserById = await userService.findUserByProperty(
    {
      _id: req.params.id
    },
    [],
    ['-password']
  );
  if (resultFindUserById.status === 'success') {
    if (resultFindUserById.data.microsoftId === '000' || !resultFindUserById.data.microsoftId) {
      const resultChangeSimpleUserInformation =
        await userService.changeSimpleUserInformation(req.body, req.params.id);
      if (resultChangeSimpleUserInformation.status === 'error') {
        return res
          .status(400)
          .json({
            message: resultChangeSimpleUserInformation.err.message
          });
      }
    }
    const getRoles = await roleService.getAllRoleByUser(
      req.params.id,
      date,
      'app'
    );
    if (getRoles.status === 'success') {
      const tlRoleId = await roleService.getRoleByLabelService('Team Leader');
      if (tlRoleId.status !== 'success') {
        logger.error(
          'update role: get role by label error :' + tlRoleId.err.message,
          req.route ? req.baseUrl + req.route.path : 'testing',
          req.method ? req.method : 'testing'
        );
        return res.status(400).json({ message: tlRoleId.err.message });
      }
      const filtredRoles = getRoles.data.map(item => {
        if ((!roles.includes(item.role._id.toString())) && item.role._id !== tlRoleId) {
          rolesToDelete.push(item.role._id.toString());
        }
        return item.role._id.toString();
      })
      roles.map(item => {
        if (!filtredRoles.includes(item)) {
          rolesToAdd.push(item);
        }
      })
      if (rolesToAdd.length !== 0) {
        const objectRolesToAdd = rolesToAdd.map(role => (
          {
            shiftId: null,
            userMicrosoftId: resultFindUserById.data.microsoftId ? resultFindUserById.data.microsoftId : 'null',
            name: 'app_GS',
            startDate: moment().utc().format(),
            endDate: moment().utc().add(10, 'y').startOf('day').format(),
            updatedShiftAt: moment().utc().format(),
            role: role,
            user: req.params.id,
            type: 'app',
            reference: null
          }
        ))
        //Add app shifts
        const addedRole = await shiftService.addShift(objectRolesToAdd);
        if (addedRole.status !== 'success') {
          logger.error(
            'update user : add new role error :' + addedRole.err.message,
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing'
          );
        } else {
          logger.info(
            'update user : add new role success : ',
            req.route ? req.baseUrl + req.route.path : 'testing',
            req.method ? req.method : 'testing'
          );
        }
      }
      if (rolesToDelete.length !== 0) {
        //Update old shift endDate
        Shift.updateMany(
          { 'role': { $in: rolesToDelete }, 'type': 'app', 'user': req.params.id },
          { $set: { 'endDate': moment().utc().format() } },
          function (err, val) {
            if (err) {
              logger.error(
                'update user : update shift error :' + deletedShifts.err.message,
                req.route ? req.baseUrl + req.route.path : 'testing',
                req.method ? req.method : 'testing'
              );
              return res.status(400).json({ message: err.message });
            } else {
              logger.info(
                'update user : update old shift endDate success',
                req.route ? req.baseUrl + req.route.path : 'testing',
                req.method ? req.method : 'testing'
              );
            }
          }
        )
      }
    } else {
      return res
        .status(400)
        .json({
          message: getRoles.err.message
        });
    }

    return res.status(200).json({
      message: 'User successfully updated'
    });

  }
  if (resultFindUserById.status == 'error') {
    return res
      .status(resultFindUserById.statusCode ? resultFindUserById.statusCode : 400)
      .json({ message: resultFindUserById.err.message });
  }
};
