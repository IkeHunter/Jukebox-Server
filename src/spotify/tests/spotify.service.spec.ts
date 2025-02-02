import { getModelToken } from '@nestjs/mongoose'
import type { TestingModule } from '@nestjs/testing'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import Axios from 'axios'
import { Model } from 'mongoose'
import type { MockType } from 'src/utils'
import type { Repository } from 'typeorm'
import { SpotifyAccount } from '../entities/spotify-account.entity'
import { SpotifyService } from '../spotify.service'

describe('SpotifyService', () => {
  let service: SpotifyService

  beforeEach(async () => {
    const mockSpotifyLinkRepo: () => MockType<Repository<SpotifyAccount>> = jest.fn(() => ({}))
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpotifyService,
        { provide: getModelToken(SpotifyAccount.name), useValue: Model<SpotifyAccount> },
        {
          provide: Axios.Axios,
          useValue: Axios.create(),
        },
        {
          provide: getRepositoryToken(SpotifyAccount),
          useFactory: mockSpotifyLinkRepo,
        },
      ],
    }).compile()

    service = module.get<SpotifyService>(SpotifyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
