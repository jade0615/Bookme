import { PrismaClient, Industry, BusinessType, Role, Language } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 创建测试商家
  const business = await prisma.business.upsert({
    where: { email: 'demo@bookmee.com' },
    update: {},
    create: {
      name: 'Beauty Studio Demo',
      email: 'demo@bookmee.com',
      phone: '+1234567890',
      industry: Industry.BEAUTY,
      businessType: BusinessType.SINGLE,
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      timezone: 'America/New_York',
      settings: {
        workingHours: {
          monday: { open: '09:00', close: '17:00', closed: false },
          tuesday: { open: '09:00', close: '17:00', closed: false },
          wednesday: { open: '09:00', close: '17:00', closed: false },
          thursday: { open: '09:00', close: '17:00', closed: false },
          friday: { open: '09:00', close: '17:00', closed: false },
          saturday: { open: '10:00', close: '16:00', closed: false },
          sunday: { open: '', close: '', closed: true }
        },
        autoConfirmBookings: true,
        requireDeposit: true,
        depositPercentage: 20,
        cancellationPolicy: {
          '24h': { refundPercentage: 100 },
          '12h': { refundPercentage: 50 },
          '0h': { refundPercentage: 0 }
        }
      }
    }
  });

  console.log('✅ Created business:', business.name);

  // 创建位置
  const location = await prisma.location.upsert({
    where: { id: 'demo-location-1' },
    update: {},
    create: {
      id: 'demo-location-1',
      businessId: business.id,
      name: 'Main Location',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1234567890'
    }
  });

  console.log('✅ Created location:', location.name);

  // 创建员工
  const employees = await Promise.all([
    prisma.employee.upsert({
      where: { id: 'demo-employee-1' },
      update: {},
      create: {
        id: 'demo-employee-1',
        businessId: business.id,
        locationId: location.id,
        firstName: 'Alice',
        lastName: 'Johnson',
        email: 'alice@bookmee.com',
        phone: '+1234567891',
        role: Role.OWNER
      }
    }),
    prisma.employee.upsert({
      where: { id: 'demo-employee-2' },
      update: {},
      create: {
        id: 'demo-employee-2',
        businessId: business.id,
        locationId: location.id,
        firstName: 'Bob',
        lastName: 'Smith',
        email: 'bob@bookmee.com',
        phone: '+1234567892',
        role: Role.STAFF
      }
    })
  ]);

  console.log('✅ Created employees:', employees.length);

  // 创建服务
  const services = await Promise.all([
    prisma.service.upsert({
      where: { id: 'demo-service-1' },
      update: {},
      create: {
        id: 'demo-service-1',
        businessId: business.id,
        name: 'Manicure',
        description: 'Professional manicure service',
        duration: 60, // 60 minutes
        price: 50.00,
        deposit: 10.00, // 20% deposit
        category: 'Nails'
      }
    }),
    prisma.service.upsert({
      where: { id: 'demo-service-2' },
      update: {},
      create: {
        id: 'demo-service-2',
        businessId: business.id,
        name: 'Hair Cut & Style',
        description: 'Professional haircut and styling',
        duration: 90, // 90 minutes
        price: 80.00,
        deposit: 16.00, // 20% deposit
        category: 'Hair'
      }
    }),
    prisma.service.upsert({
      where: { id: 'demo-service-3' },
      update: {},
      create: {
        id: 'demo-service-3',
        businessId: business.id,
        name: 'Facial Treatment',
        description: 'Relaxing facial treatment',
        duration: 75, // 75 minutes
        price: 120.00,
        deposit: 24.00, // 20% deposit
        category: 'Facial'
      }
    })
  ]);

  console.log('✅ Created services:', services.length);

  // 关联员工与服务
  const employeeServices = await Promise.all([
    // Alice can do all services
    ...services.map(service => 
      prisma.employeeService.upsert({
        where: { 
          employeeId_serviceId: {
            employeeId: employees[0]!.id,
            serviceId: service.id
          }
        },
        update: {},
        create: {
          employeeId: employees[0]!.id,
          serviceId: service.id
        }
      })
    ),
    // Bob can do manicure and haircut
    ...services.slice(0, 2).map(service => 
      prisma.employeeService.upsert({
        where: { 
          employeeId_serviceId: {
            employeeId: employees[1]!.id,
            serviceId: service.id
          }
        },
        update: {},
        create: {
          employeeId: employees[1]!.id,
          serviceId: service.id
        }
      })
    )
  ]);

  console.log('✅ Created employee-service relationships:', employeeServices.length);

  // 创建测试用户
  const hashedPassword = await bcrypt.hash('password123', 12);
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john@example.com' },
      update: {},
      create: {
        email: 'john@example.com',
        phone: '+1234567893',
        firstName: 'John',
        lastName: 'Doe',
        language: Language.EN,
        timezone: 'America/New_York'
      }
    }),
    prisma.user.upsert({
      where: { email: 'maria@example.com' },
      update: {},
      create: {
        email: 'maria@example.com',
        phone: '+1234567894',
        firstName: 'Maria',
        lastName: 'Garcia',
        language: Language.ES,
        timezone: 'America/Los_Angeles'
      }
    }),
    prisma.user.upsert({
      where: { email: 'li@example.com' },
      update: {},
      create: {
        email: 'li@example.com',
        phone: '+1234567895',
        firstName: '小明',
        lastName: '李',
        language: Language.ZH,
        timezone: 'America/New_York'
      }
    })
  ]);

  console.log('✅ Created test users:', users.length);

  console.log('🌱 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });