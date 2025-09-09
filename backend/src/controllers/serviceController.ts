import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '@/types';

// 获取服务列表
export const getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: [],
      message: 'Services retrieved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 获取单个服务
export const getService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { id, name: 'Service Name', duration: 60, price: 100 },
      message: 'Service retrieved successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 创建服务
export const createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response: ApiResponse = {
      success: true,
      data: { id: 'new-service-id', ...req.body },
      message: 'Service created successfully'
    };
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

// 更新服务
export const updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { id, ...req.body },
      message: 'Service updated successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 删除服务
export const deleteService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { id },
      message: 'Service deleted successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 分配员工到服务
export const assignEmployees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { serviceId: id, employees: req.body.employees },
      message: 'Employees assigned to service successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

// 从服务中移除员工
export const removeEmployee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, employeeId } = req.params;
    const response: ApiResponse = {
      success: true,
      data: { serviceId: id, removedEmployeeId: employeeId },
      message: 'Employee removed from service successfully'
    };
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const serviceController = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  assignEmployees,
  removeEmployee
};
