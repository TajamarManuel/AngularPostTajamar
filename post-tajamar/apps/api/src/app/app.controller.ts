import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { SqlInsert, SqlInsertSelect, SqlProcedure, SqlUpdate } from '@post-tajamar/interfaces-sql';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(':query')
  getData(@Param() params) {
    return this.appService.get(params.query)
  }

  @Get('one/:tabla/:id')
  getOne(@Param() params) {
    return this.appService.getOne(params.tabla, params.id)
  }

  @Get('all/:tabla')
  getAll(@Param() params) {
    return this.appService.getAll(params.tabla)
  }

  @Post()
  post(@Body() JsonInsert: SqlInsert) {
    return this.appService.post(JsonInsert)
  }

  @Post('select')
  postSelect(@Body() JsonInsertSelect: SqlInsertSelect) {
    return this.appService.postSelect(JsonInsertSelect)
  }

  @Put()
  put(@Body() JsonUpdate: SqlUpdate) {
    return this.appService.put(JsonUpdate)
  }

  @Delete(':json')
  delete(@Param() params) {
    return this.appService.delete(JSON.parse(params.json))
  }

  @Post('procedure')
  procedure(@Body() procedure: SqlProcedure) {
    return this.appService.procedure(procedure)
  }
}
