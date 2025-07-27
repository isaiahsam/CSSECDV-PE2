const sequelize = require('../config/database');
const User = require('./user');
const Service = require('./service');
const Reservation = require('./reservation');
const AuditLog = require('./auditLog');

// Define associations
User.hasMany(Reservation, { foreignKey: 'userId', as: 'reservations' });
Reservation.belongsTo(User, { foreignKey: 'userId', as: 'customer' });

Service.hasMany(Reservation, { foreignKey: 'serviceId' });
Reservation.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(Service, { foreignKey: 'createdBy', as: 'createdServices' });
Service.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

User.hasMany(AuditLog, { foreignKey: 'userId' });
AuditLog.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Service,
  Reservation,
  AuditLog
};