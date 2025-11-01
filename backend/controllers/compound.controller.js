// controllers/compound.controller.js

const Compound = require('../models/compound.model');

exports.getAllCompounds = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;    const offset = (page - 1) * limit;
    const { count, rows } = await Compound.findAndCountAll({
      limit,
      offset,
      order: [['id', 'ASC']]
    });

    res.status(200).json({
      totalItems: count,
      compounds: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching compounds', error: error.message });
  }
};

exports.getCompoundById = async (req, res) => {
  try {
    const compound = await Compound.findByPk(req.params.id);
    if (!compound) {
      return res.status(404).json({ message: 'Compound not found' });
    }

    res.status(200).json(compound);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching compound', error: error.message });
  }
};

exports.updateCompound = async (req, res) => {
  try {
    const { name, image, description, isFavorite } = req.body;
    const compoundId = req.params.id;
    
    if (name === undefined || image === undefined || description === undefined) {
      return res.status(400).json({ message: 'Core fields (name, image, description) are required' });
    }

    const compound = await Compound.findByPk(compoundId);
    if (!compound) {
      return res.status(404).json({ message: 'Compound not found' });
    }
    await compound.update({ name, image, description, isFavorite });

    res.status(200).json(compound);
  } catch (error) {
    res.status(500).json({ message: 'Error updating compound', error: error.message });
  }
};

// exports.createCompound=async(req,res)=>{
//   try{
//     const{name,image,desciption}=req.body;
//     if(!Array.isArray(compounds)||compounds.length==0)
//     {
//       return res.status(400).json({message:'It should contain an array of compounds'});
//     }
//     for(const compound of compounds)
//     {
//     if(!compound.name || !compound.description)
//     {
//       return res.status(400).json({message:'Name and desciption are required'});
//     }
//     }
//     const newCompound=await Compound.insertMany(compounds);
//       res.status(201).json({message: `${createdCompounds.length}
//       'Compounds created successfully'`,
//     data: createdCompounds});
//       }
//     catch(error){
//     console.error(error);
//     res.status(500).json({message:
//     'Server error',error:error.message});
//      }
// };

exports.createCompounds = async (req, res) => {
  try {
    const compounds = req.body;

    // 1. Check if body is an array
    if (!Array.isArray(compounds) || compounds.length === 0) {
      return res.status(400).json({ message: "Compounds should be an array with at least one entry" });
    }

    // 2. Validate each entry
    for (const compound of compounds) {
      if (!compound.name || !compound.description) {
        return res.status(400).json({ message: "Each compound must include name and description" });
      }
    }

    // 3. Bulk insert into DB
    const createdCompounds = await Compound.bulkCreate(compounds);

    // 4. Send response
    res.status(201).json({
      message: `${createdCompounds.length} compounds created successfully`,
      data: createdCompounds
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
