import { Inject, Injectable } from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config/sercices';
import { InjectModel } from '@nestjs/mongoose';
import { Device } from 'src/schemas/device.schema';
import { Model } from 'mongoose';
import { CustomRpcException } from 'src/interfaces/ErrorResponse';
import { FindOneDeviceDto } from './dto/find-one-device.dto';

@Injectable()
export class DevicesService {
  constructor(
    @Inject(NATS_SERVICE) private readonly client: ClientProxy,
    @InjectModel(Device.name) private readonly deviceModel: Model<Device>,
  ) {}

  async create(createDeviceDto: CreateDeviceDto) {
    const { name, userId } = createDeviceDto;

    const newDevice = await this.deviceModel.create({
      name,
      userId,
    });

    return {
      id: newDevice._id,
      name: newDevice.name,
    };
  }

  async findAll(userId: string) {
    const devices = await this.deviceModel
      .find({ userId })
      .select('_id name')
      .exec();
    return devices.map((device) => ({
      id: device._id,
      name: device.name,
    }));
  }

  async findOne(findOneDeviceDto: FindOneDeviceDto) {
    const { id, userId } = findOneDeviceDto;
    const device = await this.deviceModel.findOne({ _id: id, userId }).exec();
    if (!device) {
      throw new CustomRpcException(404, 'Device not found');
    }

    return {
      id: device._id,
      name: device.name,
    };
  }

  async update(updateDeviceDto: UpdateDeviceDto) {
    const { id, userId, ...rest } = updateDeviceDto;
    const device = await this.deviceModel.findOne({ _id: id, userId }).exec();
    if (!device) {
      throw new CustomRpcException(404, 'Device not found');
    }

    await this.deviceModel.updateOne({ _id: id }, { ...rest }).exec();
    const updatedDevice = await this.deviceModel.findById(id).exec();
    if (!updatedDevice) {
      throw new CustomRpcException(404, 'Device not found after update');
    }

    return {
      id: updatedDevice._id,
      name: updatedDevice.name,
    };
  }

  // remove(id: number) {
  //   return `This action removes a #${id} device`;
  // }
}
