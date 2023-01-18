const GradeImage = ({ progress }) => {
  const returnImage = () => {
    if (progress < 25) {
      return <img src="./grades/grade-0.jpg" alt="" />;
    } else if (progress < 50 && progress >= 25) {
      return <img src="./grades/grade-1.jpg" alt="" />;
    } else if (progress < 100 && progress >= 50) {
      return <img src="./grades/grade-2.jpg" alt="" />;
    } else if (progress < 300 && progress >= 100) {
      return <img src="./grades/grade-3.jpg" alt="" />;
    } else if (progress < 500 && progress >= 300) {
      return <img src="./grades/grade-4.jpg" alt="" />;
    } else if (progress < 750 && progress >= 500) {
      return <img src="./grades/grade-5.jpg" alt="" />;
    } else if (progress < 1000 && progress >= 750) {
      return <img src="./grades/grade-6.jpg" alt="" />;
    } else if (progress < 1500 && progress >= 1000) {
      return <img src="./grades/grade-7.jpg" alt="" />;
    } else if (progress < 2000 && progress >= 1500) {
      return <img src="./grades/grade-8.jpg" alt="" />;
    } else if (progress < 3000 && progress >= 2000) {
      return <img src="./grades/grade-9.jpg" alt="" />;
    } else if (progress < 4000 && progress >= 3000) {
      return <img src="./grades/grade-10.jpg" alt="" />;
    } else if (progress < 5000 && progress >= 4000) {
      return <img src="./grades/grade-11.jpg" alt="" />;
    } else if (progress < 6000 && progress >= 5000) {
      return <img src="./grades/grade-12.jpg" alt="" />;
    } else if (progress < 8000 && progress >= 6000) {
      return <img src="./grades/grade-13.jpg" alt="" />;
    } else {
      return <img src="./grades/grade-14.jpg" alt="" />;
    }
  };

  return returnImage();
};

export default GradeImage;
