import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email,'Verific user')
    const user = await this.userService.findOne(email);
    if(!user){
        return null
    }
    const isMatch = await bcrypt.compare(pass,user.password);
    console.log(user)
    if (user && isMatch) {
      const { password, ...result } = user;
      console.log("Logged in")
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log('LOGIN')
    const payload = { email: user.email, sub: user.user_id };
    return {
      access_token: this.jwtService.sign(payload),
      userId:user.id,
      name:user.name
    };
  }
}