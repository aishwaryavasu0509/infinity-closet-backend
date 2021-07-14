const Review = require("../model/reviewSchema");

exports.createReview = async (req, res) => {
  try {
    const reviewData = new Review(req.body);
    const review = await reviewData.save();

    res.status(201).json({
      status: "success",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "fail", error });
  }
};



exports.getSingleReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    res.status(201).json({
      status: "success",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "fail", error });
  }
};

exports.getAllReview = async (req, res) => {
  try {
    const review = await Review.find();

    res.status(201).json({
      status: "success",
      result: review.length,
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "fail", error });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: "success",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "fail", error });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    res.status(201).json({
      status: "success",
      review,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "fail", error });
  }
}