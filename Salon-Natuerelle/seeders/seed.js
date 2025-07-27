const { sequelize, User, Service } = require('../models');
const { hashPassword } = require('../utils/hashPassword');

const seedDatabase = async () => {
  try {
    // Sync database
    await sequelize.sync({ force: true });
    console.log('Database synced successfully');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@salonnatuerelle.com',
      password: 'Admin@123',
      role: 'Admin'
    });
    console.log('Admin user created');

    // Create manager user
    const manager = await User.create({
      name: 'Manager User',
      email: 'manager@salonnatuerelle.com',
      password: 'Manager@123',
      role: 'Manager'
    });
    console.log('Manager user created');

    // Create sample customers
    const customers = await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Customer@123',
        role: 'Customer'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'Customer@123',
        role: 'Customer'
      }
    ]);
    console.log('Sample customers created');

    // Create sample services
    const services = await Service.bulkCreate([
      {
        name: 'Haircut',
        description: 'Professional haircut with styling',
        price: 30.00,
        duration: 45,
        createdBy: manager.id
      },
      {
        name: 'Hair Coloring',
        description: 'Full hair coloring service',
        price: 80.00,
        duration: 120,
        createdBy: manager.id
      },
      {
        name: 'Manicure',
        description: 'Complete nail care and polish',
        price: 25.00,
        duration: 30,
        createdBy: manager.id
      },
      {
        name: 'Pedicure',
        description: 'Foot care and nail treatment',
        price: 35.00,
        duration: 45,
        createdBy: manager.id
      },
      {
        name: 'Facial Treatment',
        description: 'Deep cleansing facial',
        price: 60.00,
        duration: 60,
        createdBy: manager.id
      }
    ]);
    console.log('Sample services created');

    console.log('\nSeed data created successfully!');
    console.log('\nLogin credentials:');
    console.log('Admin: admin@salonnatuerelle.com / Admin@123');
    console.log('Manager: manager@salonnatuerelle.com / Manager@123');
    console.log('Customer: john@example.com / Customer@123');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

// Run seeder if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;