import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { IShowCustomer } from '../domain/models/IShowCustomer';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
