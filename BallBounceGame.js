import React, { useEffect, useRef, useState } from 'react';

const BallBounceGame = () => {
  const canvasRef = useRef(null);
  const [ball, setBall] = useState({
    x: 50,
    y: 50,
    radius: 10,
    dx: 2,
    dy: 2,
  });

  const drawBall = (ctx, ball) => {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
  };

  const updateBallPosition = (ball, width, height) => {
    let newBall = { ...ball };

    newBall.x += newBall.dx;
    newBall.y += newBall.dy;

    if (
      newBall.x + newBall.dx > width - newBall.radius ||
      newBall.x + newBall.dx < newBall.radius
    ) {
      newBall.dx = -newBall.dx;
    }
    if (
      newBall.y + newBall.dy > height - newBall.radius ||
      newBall.y + newBall.dy < newBall.radius
    ) {
      newBall.dy = -newBall.dy;
    }

    return newBall;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const gameLoop = () => {
      ctx.clearRect(0, 0, width, height);
      drawBall(ctx, ball);
      setBall(prevBall => updateBallPosition(prevBall, width, height));

      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => cancelAnimationFrame(gameLoop);
  }, [ball]);

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    const distanceFromBall = Math.sqrt(
      (clickX - ball.x) ** 2 + (clickY - ball.y) ** 2
    );

    if (distanceFromBall <= ball.radius) {
      setBall((prevBall) => ({
        ...prevBall,
        dx: -prevBall.dx,
        dy: -prevBall.dy,
      }));
    }
  };

  return (
    <div>
      <h1>Ball Bounce Game</h1>
      <canvas
        ref={canvasRef}
        width="500"
        height="400"
        style={{ border: '1px solid #000' }}
        onClick={handleCanvasClick}
      />
    </div>
  );
};

export default BallBounceGame;
