import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>
  ) { }

  async create(userId: number, createBlogDto: CreateBlogDto) {
    console.log(userId , createBlogDto)
    const post = this.blogRepository.create({
      ...createBlogDto,
      user: { id: userId }
    });
    return this.blogRepository.save(post);
  }

  findAll(userId : number) {
    return this.blogRepository.find({
      where: {
        user: {
          id: userId
        }
      },
      relations: ['user']
    })
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['user']
    });
    if (!blog) {
      throw new NotFoundException(`بلاگی با این شناسه یافت نشد.`);
    }
    return blog;
  }

  async update(id: number, userId: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.findOne(id);
    if (blog.user.id !== userId) {
      throw new BadRequestException('شما اجازه تغییر این بلاگ رو ندارید.');
    }
    await this.blogRepository.update(id, updateBlogDto)

  }

  async remove(id: number) {
    const blog = await this.findOne(id);
    return this.blogRepository.remove(blog)
  }
}
