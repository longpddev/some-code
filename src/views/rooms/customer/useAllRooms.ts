import React, { useState, useEffect } from 'react'

import { useQuery } from '@apollo/client'
import { ALL_ROOMS } from '../../../graphql/queries/Room/allRooms'
import { IRoomPaginatedType } from '../../../interfaces/IRoomType'
export default function useAllRooms (pageSize: number, page: number, options?: { skip: boolean }) {
    const { loading, error, data } = useQuery<{
        allRooms: IRoomPaginatedType
    }>(ALL_ROOMS, {
        variables: {
            pageSize,
            page
        },
        skip: options?.skip || false
    })

    return {
        loading,
        error,
        data: data?.allRooms
    }
}