import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CaretakerEntity } from 'src/caretakers/dto/caretaker.entity';
import { GetCurrentUserUuid } from 'src/common/decorators';
import { ShelterRoleGuard } from 'src/common/guards/shelterRole.guard';
import { DogEntity } from 'src/dogs/dto/dog.entity';
import { KennelEntity } from 'src/kennels/dto/kennel.entity';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { ShelterEntity } from './dto/shelter.entity';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { SheltersService } from './shelters.service';

@ApiTags('shelters')
@ApiBearerAuth()
@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Post()
  @ApiCreatedResponse({ type: ShelterEntity })
  create(
    @Body() createShelterDto: CreateShelterDto,
    @GetCurrentUserUuid() userUuid: string,
  ) {
    return this.sheltersService.create(createShelterDto, userUuid);
  }

  @UseGuards(ShelterRoleGuard('ADMIN'))
  @Get(':shelterUuid/caretakers')
  getAllCaretakers(
    @Param('shelterUuid') shelterUuid: string,
  ): Promise<CaretakerEntity[]> {
    return this.sheltersService.getAllCaretakers(shelterUuid);
  }

  @UseGuards(ShelterRoleGuard('CARETAKER'))
  @Get(':shelterUuid/kennels')
  getAllKennels(
    @Param('shelterUuid') shelterUuid: string,
  ): Promise<KennelEntity[]> {
    return this.sheltersService.getAllKennels(shelterUuid);
  }

  @UseGuards(ShelterRoleGuard('CARETAKER'))
  @Get(':shelterUuid/dogs')
  @ApiOkResponse({ type: [DogEntity] })
  getAllDogs(@Param('shelterUuid') shelterUuid: string): Promise<DogEntity[]> {
    return this.sheltersService.getAllDogs(shelterUuid);
  }
  // @Get('getUserShelters')
  // getUserShelters(@GetCurrentUserUuid() userUuid: string) {
  //   return this.sheltersService.getUserShelters(userUuid);
  // }

  // @Post('addCaretakerByEmail/:id')
  // addCaretakerByEmail(
  //   @Param('id') id: string,
  //   @Body() addByEmail: { email: string },
  // ) {
  //   return this.sheltersService.addCaretakerByEmail(id, addByEmail);
  // }

  // @Post(':shelterId/updateCaretakerRole')
  // updateCaretakerRole(
  //   @Param('shelterId') shelterId: string,
  //   @Body() caretakerRole: UpdateCaretakerRole,
  // ) {
  //   return this.sheltersService.updateCaretakerRole(shelterId, caretakerRole);
  // }

  // @Post(':id/removeCaretakerByEmail/:useruuid')
  // removeCaretakerByEmail(
  //   @Param('id') id: string,
  //   @Param('useruuid') userUuid: string,
  // ) {
  //   return this.sheltersService.removeCaretakerByEmail(id, userUuid);
  // }

  @UseGuards(ShelterRoleGuard('CARETAKER'))
  @Get(':shelterUuid')
  @ApiOkResponse({ type: ShelterEntity })
  findOne(@Param('shelterUuid') shelterUuid: string): Promise<ShelterEntity> {
    return this.sheltersService.findOne(shelterUuid);
  }

  @UseGuards(ShelterRoleGuard('ADMIN'))
  @Patch(':shelterUuid')
  @ApiOkResponse({ type: ShelterEntity })
  update(
    @Param('shelterUuid') shelterUuid: string,
    @Body() updateShelterDto: UpdateShelterDto,
  ): Promise<ShelterEntity> {
    return this.sheltersService.update(shelterUuid, updateShelterDto);
  }

  @UseGuards(ShelterRoleGuard('ADMIN'))
  @Delete(':shelterUuid')
  @ApiOkResponse({ type: ShelterEntity })
  remove(@Param('shelterUuid') shelterUuid: string): Promise<ShelterEntity> {
    return this.sheltersService.remove(shelterUuid);
  }
}
