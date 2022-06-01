import Taller from '../models/taller.model';
import Classroom from '../models/classroom.model';
import User from '../models/user.model';


export const getClassrooms = async (req,res) => {
    try{
        const classrooms = await Classroom.find();
        res.status(200).json(classrooms)
    } catch(err){
        res.json(err);
    }
}

export const createClassroom = async (req,res) => {
    
    
    const {user, name, zoomLink, timeStart, tallerId, description} = req.body;
    const classroom = new Classroom({
        name,
        description,
        zoomLink,
        timeStart
    });
    await classroom.save()
    classroom.students.push(user._id);
    await classroom.save()

    const currentTaller = await Taller.findOne({tallerId});
    currentTaller.classrooms.push(classroom);
    await currentTaller.save();
    
    res.status(201).json({message:"Classroom created successfully"})
}

export const getClassroomByTaller = async (req,res) => {
    const {tallerId} = req.body;
    const taller = await Taller.findOne({tallerId});
    const tallerClassrooms = await Classroom.find({_id:{$in:taller.classrooms}});

    res.status(200).json(tallerClassrooms)
}

export const getClassroomById = (req,res) => {
    try{
        const classroom = Classroom.findById(req.params.listId);
        res.status(200).json(classroom)
    } catch(err){
        res.status(404).json(err)
    }
}

export const deleteClassroomById = async (req,res) => {
    try{
        const classroom = await Classroom.findByIdAndDelete(req.params.listId);
        res.status(200).json(classroom)
    } catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}

export const updateClassroomById = (req,res) => {
    try{
        const classroom = Classroom.findByIdAndUpdate(req.params.listId,req.body,{new:true,runValidators:true});
        res.status(200).json(classroom)
    } catch(err){
        res.status(404).json(err)
    }
}

export const getClassroomByUser = async (req,res) => {
    try{
        const {user} = req.body;
        const userClassrooms = await Classroom.find({students:{$in:user}}).populate('students');
        console.log('aqui', userClassrooms)
        res.status(200).json(userClassrooms)
    } catch(err){
        res.status(404).json(err)
    }
}

export const enrollClassroom = async (req,res) => {
    try{
        const {user,code} = req.body;
        console.log(code)
        const userId = user._id;
        const currentUser = await User.findById(userId);
        const currentClassroom = await Classroom.findById(code);
        currentClassroom.students.push(currentUser);
        await currentClassroom.save();
        res.status(201).json({message:"Student enrolled successfully"})
    } catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}


export const unenrollClassroom = async (req,res) => {
    try{
        const classroomId = req.params.listId;
        console.log('ASDASDASDADS')
        const {user} = req.body;
        const userId = user._id;
        console.log(classroomId, userId)
        const currentUser = await User.findById(userId);
        const currentClassroom = await Classroom.findById(classroomId);
        currentClassroom.students.pull(currentUser);
        await currentClassroom.save();

        res.status(201).json({message:"Student unenrolled successfully"})
    } catch(err){
        console.log(err)
        res.status(404).json(err)
    }
}
