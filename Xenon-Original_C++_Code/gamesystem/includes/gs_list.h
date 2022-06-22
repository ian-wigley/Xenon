//-------------------------------------------------------------
//
// Class:	gsCList Template
//
// Author:	John M Phillips
//
// Started:	12/03/00
//
// Base:	None
//
// Derived:	None
//
//-------------------------------------------------------------

#ifndef _INCLUDE_GS_LIST_H
#define _INCLUDE_GS_LIST_H

#include <string.h>
#include "gs_error.h"

//-------------------------------------------------------------
// Initial allocation

const int gsLIST_DEFAULT_ALLOCATION = 1;

//-------------------------------------------------------------
// Re-allocation strategy
//
// new_size = old_size * T + P

const int gsLIST_ALLOCATION_TIMES = 1;
const int gsLIST_ALLOCATION_PLUS = 1;

//-------------------------------------------------------------
// List Class Template

template<class Type> class gsCList
{
	private:
	
		Type *m_array;
		int m_count;
		int m_allocated_size;

		void allocate(int new_size);
		
	public:
		gsCList(int size = 0);

		void clear();

		void addItem(Type data);
		void removeItem(const Type data);
		void removeIndex(int index);
		void insertItem(int index,const Type data);
		int findItem(const Type data);
		void setItem(int index,Type data);
		void removeEmptyItems();

		inline Type operator [] (int index) const;

		inline int getSize();
		void setSize(int size);

		inline bool isEmpty();

		virtual ~gsCList();
};

//-------------------------------------------------------------
// Constructor

template<class Type>
gsCList<Type>::gsCList(int size)
{
	m_array = 0;
	m_count = 0;
	m_allocated_size = 0;
	if (size)
		setSize(size);
}

//-------------------------------------------------------------
// Clear list

template<class Type>
void gsCList<Type>::clear()
{
	m_count = 0;

	if (m_array) {
		delete [] m_array;
		m_array = 0;
		}

	m_allocated_size = 0;
}

//-------------------------------------------------------------
// Allocate/Re-allocate space

template<class Type>
void gsCList<Type>::allocate(int new_size)
{
	if (new_size <= 0 || new_size < m_count)
		return;
	Type *old_array = m_array;
	m_allocated_size = new_size;
	m_array = new Type[m_allocated_size];
	if (m_count > 0)
		memcpy(m_array,old_array,m_count * sizeof(Type));
	if (old_array)
		delete [] old_array;
}

//-------------------------------------------------------------
// Add item to list

template<class Type>
void gsCList<Type>::addItem(Type data)
{
	if (m_count == m_allocated_size) {
		if (m_allocated_size == 0)
			allocate(gsLIST_DEFAULT_ALLOCATION);
		else
			allocate(m_allocated_size * gsLIST_ALLOCATION_TIMES + gsLIST_ALLOCATION_PLUS);
		}

	m_array[m_count++] = data;
}

//-------------------------------------------------------------
// Set the value of an existing item

template<class Type>
void gsCList<Type>::setItem(int index,Type data)
{
	if (index >= 0 || index < m_count)
		m_array[index] = data;
}
		
//-------------------------------------------------------------
// Remove all references to an item from list

template<class Type>
void gsCList<Type>::removeItem(const Type data)
{
	int index = findItem(data);

	while (index != -1) {
		removeIndex(index);
		index = findItem(data);
		}
}

//-------------------------------------------------------------
// Remove item at given index

template<class Type>
void gsCList<Type>::removeIndex(int index)
{
	if (index < 0 || index >= m_count)
		return;

	if (index < m_count - 1)
		memmove(&m_array[index],&m_array[index + 1],(m_count - 1 - index) * sizeof(Type));

	m_count--;
}

//-------------------------------------------------------------
// Insert item into list

template<class Type>
void gsCList<Type>::insertItem(int index,Type data)
{
	if (index < 0 || index > m_count)
		return;

	if (m_count == 0 ||
		index == m_count)
		addItem(data);
	else {
		Type last = m_array[m_count - 1];

		for (int i = m_count - 1; i > index; i--)
			m_array[i] = m_array[i - 1];

		m_array[index] = data;
		addItem(last);
		}
}

//-------------------------------------------------------------
// Find item in list
//
// Returns:
//
// position of item (range 0...size of list - 1)
// -1 if item not found

template<class Type>
int gsCList<Type>::findItem(const Type data)
{
	for (int i = 0; i < m_count; i++) {
		if (m_array[i] == data)
			return i;
		}

	return -1;
}

//-------------------------------------------------------------
// Remove any empty items (i.e. == 0)

template<class Type>
void gsCList<Type>::removeEmptyItems()
{
	int i = m_count;

	while (--i >= 0) {
		if (m_array[i] == 0)
			removeIndex(i);
		}
}

//-------------------------------------------------------------
// Index item in list
//
// Returns:
//
// pointer to item (0 if index out of range)

template<class Type>
inline Type gsCList<Type>::operator [] (int index) const
{
	gsASSERT(index >= 0 && index < m_count);

	return m_array[index];
}

//-------------------------------------------------------------
// Get size of list
//
// Returns:
//
// number of items in list (0 if empty)

template<class Type>
inline int gsCList<Type>::getSize()
{
	return m_count;
}

//-------------------------------------------------------------
// Set size of list

template<class Type>
void gsCList<Type>::setSize(int size)
{
	if (size == 0) {
		if (m_array) {
			delete [] m_array;
			m_array = 0;
			}
		}
	else
		allocate(size);
	m_count = size;
}

//-------------------------------------------------------------
// Is list empty ?
//
// Returns:
//
// true/false

template<class Type>
inline bool gsCList<Type>::isEmpty()
{
	return m_count == 0;
}

//-------------------------------------------------------------
// Destructor

template<class Type>
gsCList<Type>::~gsCList()
{
	if (m_array)
		delete [] m_array;
}

//-------------------------------------------------------------

#endif

