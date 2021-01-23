import moment from 'moment';
import {v4} from 'uuid';

const uuId = v4()

class Reflection{
    constructor(){
        this.reflections = [];
    }

    // this method will return reflection object

    create(data){
        const newReflections ={
            id: uuId,
            success: data.success || '',
            lowPoint: data.lowPoint || '',
            takeAway: data.takeAway || '',
            createdDate: moment.now(),
            modifiedDate: moment.now()
        };
        this.reflections.push(newReflections);
        return newReflections;
    }
// to find single reflectios by id
    findOne(id){
        return this.reflections.find(reflect => reflect.id === id);
    }
    // to find all reflectios 
    findAll(){
        return this.reflections;
    }

    // to update reflections

    update(id, data){
        const reflection = this.findOne(id);

        const index = this.reflections.indexOf(reflection);

        this.reflections[index].success = data['success'] || reflection.success;
        this.reflections[index].lowPoint = data['lowPoint'] || reflection.lowPoint;
        this.reflections[index].takeAway = data['takeAway'] || reflection.takeAway;
        this.reflections[index].modifiedDate = moment.now()
        return this.reflections[index];
    }

    // to delete reflections

    delete(id){
        const reflection = this.findOne(id);
        const index = this.reflections.indexOf(reflection);

        this.reflections.splice(index, 1);

        return {};
    }
}

export default new Reflection();