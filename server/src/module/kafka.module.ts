import { ConsumerService } from './../service/consumer.service';
import { ProducerService } from './../service/producer.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [ProducerService, ConsumerService],
    exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
