import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { FindOneDeviceDto } from './dto/find-one-device.dto';

@Controller()
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @MessagePattern('devices.create.device')
  create(@Payload() createDeviceDto: CreateDeviceDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @MessagePattern('devices.findAll.device')
  findAll(@Payload() id: string) {
    return this.devicesService.findAll(id);
  }

  @MessagePattern('devices.findOne.device')
  findOne(@Payload() findOneDeviceDto: FindOneDeviceDto) {
    return this.devicesService.findOne(findOneDeviceDto);
  }

  @MessagePattern('devices.update.device')
  update(@Payload() updateDeviceDto: UpdateDeviceDto) {
    return this.devicesService.update(updateDeviceDto);
  }

  // @MessagePattern('removeDevice')
  // remove(@Payload() id: number) {
  //   throw new CustomRpcException(501, 'Unimplemented Method');
  // }
}
