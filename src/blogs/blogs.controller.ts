import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { RemovePasswordInterceptor } from './interceptors/remove-password.interceptor';

@Controller('users/:userId/blogs')
@UseInterceptors(RemovePasswordInterceptor)
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Post()
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createBlogDto: CreateBlogDto) {
      console.log("Hello")
      return this.blogsService.create(userId, createBlogDto);
  }

  @Get()
  findAll(@Param('userId' , ParseIntPipe) userId) {
    return this.blogsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogsService.update(id, userId, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.remove(id);
  }
}
