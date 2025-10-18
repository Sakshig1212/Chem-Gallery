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