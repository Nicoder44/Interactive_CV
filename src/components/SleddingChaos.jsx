import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import './SleddingChaos.css';

const SleddingChaos = ({ onClose }) => {
  const gameCanvasRef = useRef(null);
  const cvCanvasRef = useRef(null);
  const clonesContainerRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const { Engine, Render, World, Bodies, Body, Events, Runner } = Matter;

    const engine = Engine.create({
      gravity: { x: 0, y: 1.2 }
    });

    // Render pour le gameplay (bonhomme + plateformes) - au premier plan
    const gameRender = Render.create({
      element: gameCanvasRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'transparent',
        hasBounds: true
      }
    });

    // Render pour les éléments CV - en arrière-plan
    const cvRender = Render.create({
      element: cvCanvasRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%)',
        hasBounds: true
      }
    });

    // Créer le bonhomme en luge au niveau du bouton
    const sleddingButton = document.querySelector('.sledding-trigger');
    const buttonRect = sleddingButton ? sleddingButton.getBoundingClientRect() : null;
    const startX = buttonRect ? buttonRect.left + buttonRect.width / 2 : 300;
    const startY = buttonRect ? buttonRect.top + buttonRect.height / 2 : 100;
    
    const sleddingGuy = Bodies.rectangle(startX, startY, 50, 35, {
      restitution: 0.3,
      friction: 0.05,
      frictionAir: 0.01,
      density: 0.003,
      collisionFilter: {
        category: 0x0001,
        mask: 0x0001
      },
      render: {
        sprite: {
          texture: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(`
            <svg width="50" height="35" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="25" cy="17" rx="23" ry="15" fill="#8B4513"/>
              <circle cx="18" cy="13" r="2.5" fill="#FFD700"/>
              <circle cx="32" cy="13" r="2.5" fill="#FFD700"/>
              <path d="M 18 21 Q 25 25 32 21" stroke="#FFD700" stroke-width="2" fill="none"/>
            </svg>
          `))),
          xScale: 1,
          yScale: 1
        },
        zIndex: 10000
      },
      plugin: { isSleddingGuy: true }
    });

    // Générer des plateformes procéduralement
    const platforms = [];
    const platformGenerator = {
      lastX: -200,
      lastY: window.innerHeight - 150,
      
      generate(count, startX) {
        const newPlatforms = [];
        let currentX = startX || this.lastX;
        let currentY = this.lastY;
        
        for (let i = 0; i < count; i++) {
          const platformType = Math.random();
          let width, height, angle, x, y, color;
          
          if (platformType < 0.5) {
            // Plateforme horizontale
            width = 150 + Math.random() * 200;
            height = 20;
            angle = 0;
            x = currentX + width / 2 + 100 + Math.random() * 150;
            y = currentY + (Math.random() - 0.5) * 100;
            color = '#34495E';
          } else if (platformType < 0.75) {
            // Pente descendante (tremplin)
            width = 180;
            height = 20;
            angle = -0.3;
            x = currentX + width / 2 + 120 + Math.random() * 100;
            y = currentY + Math.random() * 80;
            color = '#E74C3C';
          } else {
            // Pente montante
            width = 150;
            height = 20;
            angle = 0.25;
            x = currentX + width / 2 + 100 + Math.random() * 120;
            y = currentY + 50 + Math.random() * 50;
            color = '#3498DB';
          }
          
          const platform = Bodies.rectangle(x, y, width, height, {
            isStatic: true,
            angle: angle,
            friction: 0.8,
            restitution: platformType < 0.75 ? 0.4 : 0.1,
            collisionFilter: {
              category: 0x0001,
              mask: 0x0001 | 0x0002
            },
            render: { fillStyle: color }
          });
          
          newPlatforms.push(platform);
          currentX = x + width / 2;
          currentY = y;
        }
        
        this.lastX = currentX;
        this.lastY = currentY;
        return newPlatforms;
      }
    };
    
    // Générer les premières plateformes
    const initialPlatforms = platformGenerator.generate(30);
    platforms.push(...initialPlatforms);
    
    // Ajouter une plateforme de départ garantie sous le bonhomme
    const startPlatform = Bodies.rectangle(
      startX,
      startY + 80,
      250,
      20,
      {
        isStatic: true,
        angle: 0,
        friction: 0.8,
        restitution: 0.3,
        collisionFilter: {
          category: 0x0001,
          mask: 0x0001 | 0x0002
        },
        render: { fillStyle: '#2ECC71' }
      }
    );
    platforms.push(startPlatform);

    // Convertir les éléments du CV en corps physiques tombants
    const cvElements = document.querySelectorAll('.cv-section, .experience-item-wrapper, .skill-item-wrapper, .hobby-item, .cv-name, .cv-title');
    const bodies = [];

    cvElements.forEach((element, index) => {
      const rect = element.getBoundingClientRect();
      
      // Cloner l'élément visuellement
      const clone = element.cloneNode(true);
      clone.style.position = 'absolute';
      clone.style.width = rect.width + 'px';
      clone.style.height = rect.height + 'px';
      clone.style.pointerEvents = 'none';
      clone.style.zIndex = '10';
      clone.style.opacity = '1';
      clone.classList.add('chaos-element');
      
      const body = Bodies.rectangle(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        rect.width,
        rect.height,
        {
          isStatic: false,
          restitution: 0.3,
          friction: 0.6,
          density: 0.0008,
          frictionAir: 0.01,
          angle: (Math.random() - 0.5) * 0.1,
          isSensor: false,
          collisionFilter: {
            category: 0x0002,
            mask: 0x0001 | 0x0002
          },
          render: { 
            visible: false
          },
          plugin: {
            domElement: clone,
            originalElement: element,
            isCVElement: true
          }
        }
      );
      
      bodies.push(body);
      clonesContainerRef.current.appendChild(clone);

      // Faire tomber progressivement chaque élément
      setTimeout(() => {
        element.style.transition = 'opacity 0.5s';
        element.style.opacity = '0';
      }, index * 100);
    });

    // Contrôles clavier
    const keys = { left: false, right: false, up: false };
    
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'q') keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
      if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'z') keys.up = true;
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'q') keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
      if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'z') keys.up = false;
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    Events.on(engine, 'beforeUpdate', () => {
      const sleddingPos = sleddingGuy.position;
      
      // Contrôles horizontaux
      if (keys.left) {
        Body.applyForce(sleddingGuy, sleddingPos, { x: -0.002, y: 0 });
      }
      if (keys.right) {
        Body.applyForce(sleddingGuy, sleddingPos, { x: 0.002, y: 0 });
      }
      
      // Saut (vérifier collision avec n'importe quel body en dessous)
      const isGrounded = engine.world.bodies.some(body => {
        if (body === sleddingGuy || !body.isStatic) return false;
        const below = body.position.y > sleddingPos.y;
        const close = Math.abs(body.position.y - sleddingPos.y) < 50;
        const aligned = Math.abs(body.position.x - sleddingPos.x) < 100;
        return below && close && aligned;
      });
      
      if (keys.up && (isGrounded || Math.abs(sleddingGuy.velocity.y) < 1)) {
        Body.setVelocity(sleddingGuy, { x: sleddingGuy.velocity.x, y: -12 });
      }
      
      // Générer de nouvelles plateformes au fur et à mesure
      if (sleddingPos.x > platformGenerator.lastX - window.innerWidth * 2) {
        const newPlatforms = platformGenerator.generate(15);
        World.add(engine.world, newPlatforms);
        platforms.push(...newPlatforms);
      }
      
      // Nettoyer les plateformes loin derrière
      const toRemove = platforms.filter(p => p.position.x < sleddingPos.x - window.innerWidth * 2);
      if (toRemove.length > 0) {
        World.remove(engine.world, toRemove);
        toRemove.forEach(p => {
          const index = platforms.indexOf(p);
          if (index > -1) platforms.splice(index, 1);
        });
      }
      
      // Nettoyer les éléments CV tombés trop bas
      const cvBodiesToRemove = bodies.filter(b => b.position.y > sleddingPos.y + window.innerHeight * 2);
      if (cvBodiesToRemove.length > 0) {
        cvBodiesToRemove.forEach(body => {
          if (body.plugin.domElement) {
            body.plugin.domElement.remove();
          }
          const index = bodies.indexOf(body);
          if (index > -1) bodies.splice(index, 1);
        });
        World.remove(engine.world, cvBodiesToRemove);
      }
      
      // Vérifier si le bonhomme est tombé trop bas
      if (sleddingPos.y > window.innerHeight + 500) {
        setGameOver(true);
        Runner.stop(runner);
        return;
      }
      
      // Caméra suit le bonhomme horizontalement ET verticalement
      const targetX = sleddingPos.x - window.innerWidth / 3;
      const targetY = Math.max(0, sleddingPos.y - window.innerHeight / 2);
      const currentBoundsX = gameRender.bounds.min.x;
      const currentBoundsY = gameRender.bounds.min.y;
      const smoothX = currentBoundsX + (targetX - currentBoundsX) * 0.1;
      const smoothY = currentBoundsY + (targetY - currentBoundsY) * 0.08;
      
      const bounds = {
        min: { x: smoothX, y: smoothY },
        max: { x: smoothX + window.innerWidth, y: smoothY + window.innerHeight }
      };
      
      Render.lookAt(gameRender, bounds);
      Render.lookAt(cvRender, bounds);
      
      // Mettre à jour la distance
      setDistance(Math.max(0, Math.floor(sleddingPos.x / 10)));
      
      // Synchroniser les clones DOM avec la physique
      bodies.forEach((body) => {
        const domElement = body.plugin.domElement;
        if (domElement) {
          const rect = body.bounds;
          const centerX = (rect.min.x + rect.max.x) / 2;
          const centerY = (rect.min.y + rect.max.y) / 2;
          const width = rect.max.x - rect.min.x;
          const height = rect.max.y - rect.min.y;
          domElement.style.transform = `translate(${centerX - width / 2}px, ${centerY - height / 2}px) rotate(${body.angle}rad)`;
        }
      });
    });

    World.add(engine.world, [...bodies, ...platforms, sleddingGuy]);

    // Démarrer
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(cvRender);
    Render.run(gameRender);

    // Cleanup
    return () => {
      Render.stop(gameRender);
      Render.stop(cvRender);
      Runner.stop(runner);
      World.clear(engine.world);
      Engine.clear(engine);
      gameRender.canvas.remove();
      cvRender.canvas.remove();
      gameRender.textures = {};
      cvRender.textures = {};
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);

      cvElements.forEach(el => el.style.opacity = '1');
      bodies.forEach((body) => {
        if (body.plugin.domElement) {
          body.plugin.domElement.remove();
        }
      });
    };
  }, []);

  return (
    <div className="sledding-chaos-overlay">
      <button className="close-chaos" onClick={onClose}>✕</button>
      {!gameOver ? (
        <>
          <div className="chaos-instructions">
            Use arrows ←→ or A/D to move, ↑ or Space to jump! 🛷
          </div>
          <div className="chaos-distance">Distance: {distance}m</div>
        </>
      ) : (
        <div className="game-over-screen">
          <h1>🛷 GAME OVER 🛷</h1>
          <p className="final-score">Final distance: {distance}m</p>
          <button className="restart-btn" onClick={() => window.location.reload()}>Restart</button>
          <button className="back-btn" onClick={onClose}>Back to CV</button>
        </div>
      )}
      <div ref={cvCanvasRef} className="cv-canvas-layer" />
      <div ref={gameCanvasRef} className="game-canvas-layer" />
      <div ref={clonesContainerRef} className="clones-container" />
    </div>
  );
};

export default SleddingChaos;
