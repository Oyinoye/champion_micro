import { ConsumerService } from './consumer.service';

import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UserRegisteredConsumer implements OnModuleInit {
    constructor( private readonly consumerService: ConsumerService) {}

    async onModuleInit() {
        await this.consumerService.consume({ topic: 'ChampionStateChanged' }, {
            eachMessage: async ({ topic, partition, message}) => {
                console.log({
                    value: message.value.toString(),
                    topic: topic.toString(),
                    partition: partition.toString(),
                })
            }
        })
    }
}