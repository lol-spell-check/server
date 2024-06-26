import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

type PlayerInput = {
  championCode: number;
  spell1Code: number;
  spell2Code: number;
  runeBoost: boolean;
};

@Injectable()
export class MatchRepository {
  constructor(private prisma: PrismaService) {}

  async createMatch(playerInput: PlayerInput[]) {
    return this.prisma.match.create({
      data: {
        players: {
          createMany: {
            data: playerInput,
          },
        },
      },
    });
  }

  async getMatchById(matchId: string) {
    return this.prisma.match.findUnique({
      where: { id: matchId },
      select: {
        players: {
          select: {
            champion: true,
            spell1: true,
            spell2: true,
            runeBoost: true,
            ionianBoost: true,
          },
        },
      },
    });
  }

  async removeMatchById(matchId: string) {
    return this.prisma.match.delete({
      where: { id: matchId },
    });
  }
}
