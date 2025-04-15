import * as React from 'react';
import { Card, Flex, Heading, Text, Box, IconButton } from '@radix-ui/themes';
import { Cross2Icon, DragHandleDots2Icon } from '@radix-ui/react-icons';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ item, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
    background: '#fff',
    borderRadius: 10,
    boxShadow: isDragging ? '0 2px 8px #0002' : undefined,
    marginBottom: 8,
    minWidth: 90,
    maxWidth: 120,
    position: 'relative',
    textAlign: 'center',
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <Box ref={setNodeRef} style={style} {...attributes}>
      <IconButton {...listeners} variant="soft" size="1" style={{ position: 'absolute', left: 2, top: 2, cursor: 'grab' }} aria-label="Arrastar">
        <DragHandleDots2Icon />
      </IconButton>
      <IconButton aria-label="Remover" color="red" size="1" style={{ position: 'absolute', right: 2, top: 2 }} onClick={() => onRemove(item)}>
        <Cross2Icon />
      </IconButton>
      <img src={item.image} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8, marginBottom: 4 }} />
      <Text size="2">{item.name}</Text>
    </Box>
  );
}

export default function Builder({ builderItems, onRemove, onReorder }) {
  const [items, setItems] = React.useState(builderItems.map(i => i.id));
  React.useEffect(() => {
    setItems(builderItems.map(i => i.id));
  }, [builderItems]);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newOrder = arrayMove(items, oldIndex, newIndex);
      setItems(newOrder);
      if (onReorder) {
        const newBuilderItems = newOrder.map(id => builderItems.find(i => i.id === id));
        onReorder(newBuilderItems);
      }
    }
  }

  // Responsivo: 2 colunas no mobile, 4+ em telas maiores
  const flexWrap = {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    justifyContent: 'center',
    minHeight: 80,
  };

  return (
    <Card size="3" style={{ minHeight: 180, margin: '24px 0', background: '#f8fafc' }}>
      <Flex direction="column" align="center" justify="center" gap="3">
        <Heading size="5">Área de Montagem</Heading>
        <Text size="3">Arraste para reordenar ou remova itens da sua montagem:</Text>
        <Box mt="3" style={flexWrap}>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items} strategy={verticalListSortingStrategy}>
              {items.length > 0 ? (
                items.map((id, idx) => {
                  const item = builderItems.find(i => i.id === id);
                  return item && item.id ? (
                    <SortableItem key={item.id} item={item} idx={idx} onRemove={onRemove} />
                  ) : null;
                })
              ) : (
                <Text color="gray">Nenhum item selecionado ainda.</Text>
              )}
            </SortableContext>
          </DndContext>
        </Box>
      </Flex>
    </Card>
  );
}
